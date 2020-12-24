//! Day 24:
//! Game of Life on a hexagonal grid. I largely recycled older code, with some new
//! code for parsing a line into a location onto a 2D hexagonal coordinate system.
//! Of note is my indexing trick to avoid casting to i32s.

use crate::prelude::*;

// Constants
const GENERATIONS: usize = 100;
const GRID_SIZE: usize = 2 * GENERATIONS + 34;
const OFFSET: usize = GRID_SIZE / 2;

// -----------------------------------------------------------------------------
// Hexagonal coordinates
// -----------------------------------------------------------------------------
#[derive(Debug, Hash, PartialEq, Eq)]
struct Coordinate {
    east: i16,
    north_east: i16,
}

// 2D Hexagonal coordinate system
//
//        / \   / \
//       /   \ /   \   __
//      |-1,1 | 0,1 |   /| Northeast
//      |     |     |  /
//     / \   / \   / \
//    /   \ /   \ /   \
//   |-1,0 | 0,0 | 1,0 | -> East
//   |     |     |     |
//    \   / \   / \   /
//     \ /   \ /   \ /
//      |0,-1 |1,-1 |
//      |     |     |
//       \   / \   /
//        \ /   \ /
//
impl std::str::FromStr for Coordinate {
    type Err = std::num::ParseIntError;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let (mut east, mut north_east) = (0, 0);
        let mut i = 0;
        while i < s.len() {
            if s.as_bytes()[i] == b'e' {
                // East
                east += 1;
                i += 1;
            } else if s.as_bytes()[i] == b'w' {
                // Anti-east (west)
                east -= 1;
                i += 1;
            } else if s.as_bytes()[i] == b'n' {
                if s.as_bytes()[i + 1] == b'e' {
                    // Northeast
                    north_east += 1;
                    i += 2;
                } else {
                    // Northeast + anti-east (northwest)
                    north_east += 1;
                    east -= 1;
                    i += 2;
                }
            } else {
                if s.as_bytes()[i + 1] == b'e' {
                    // Anti-northeast + east (southeast)
                    north_east -= 1;
                    east += 1;
                    i += 2;
                } else {
                    // Anti-northeast (southwest)
                    north_east -= 1;
                    i += 2;
                }
            }
        }
        Ok(Coordinate { east, north_east })
    }
}

impl Coordinate {
    fn to_index(&self) -> usize {
        ((OFFSET as i16 + self.east) as usize)
            + ((OFFSET as i16 + self.north_east) as usize) * GRID_SIZE
    }
}

// -----------------------------------------------------------------------------
// Hexagonal Game of Life
// -----------------------------------------------------------------------------
macro_rules! index_2d {
    ($i:expr, $j:expr, $row_length:expr) => {
        ($i) * ($row_length) + ($j)
    };
}

fn game_of_life(tiles: &mut [bool; GRID_SIZE * GRID_SIZE], generations: usize) {
    // Note: indexing off of i + 1, j + 1 to avoid signed integer casts
    let offsets = [(0, 1), (0, 2), (1, 0), (1, 2), (2, 0), (2, 1)];
    let mut next_tiles = [false; GRID_SIZE * GRID_SIZE];

    (0..generations).for_each(|generation| {
        (GENERATIONS - 1 - generation..GRID_SIZE - GENERATIONS - 1 + generation).for_each(|i| {
            (GENERATIONS - 1 - generation..GRID_SIZE - GENERATIONS - 1 + generation).for_each(
                |j| {
                    let neighbors = offsets
                        .iter()
                        .filter(|&offset| tiles[index_2d!(i + offset.0, j + offset.1, GRID_SIZE)])
                        .count();
                    next_tiles[index_2d!(i + 1, j + 1, GRID_SIZE)] = (neighbors == 2)
                        || (tiles[index_2d!(i + 1, j + 1, GRID_SIZE)] && neighbors == 1);
                },
            );
        });
        std::mem::swap(tiles, &mut next_tiles);
    });
}

// -----------------------------------------------------------------------------
// Run
// -----------------------------------------------------------------------------
pub(crate) fn run() -> Results {
    // -------------------------------------------------------------------------
    // Setup
    // -------------------------------------------------------------------------
    // Open file
    let start_setup = Instant::now();
    let buffer: String = std::fs::read_to_string("data/day24.txt").unwrap();
    let time_setup = start_setup.elapsed();

    // -------------------------------------------------------------------------
    // Part 1
    // -------------------------------------------------------------------------
    // Count initial tiles
    let start_part_1 = Instant::now();
    let mut tiles = [false; GRID_SIZE * GRID_SIZE];
    buffer.lines().for_each(|line| {
        let coordinate = line
            .parse::<Coordinate>()
            .expect("failed to parse directions");
        tiles[coordinate.to_index()] ^= true;
    });
    let count_1 = tiles.iter().filter(|&tile| *tile).count();
    let time_part_1 = start_part_1.elapsed();

    // -------------------------------------------------------------------------
    // Part 2
    // -------------------------------------------------------------------------
    // Run Game of Life
    let start_part_2 = Instant::now();
    game_of_life(&mut tiles, GENERATIONS);
    let count_2 = tiles.iter().filter(|&tile| *tile).count();
    let time_part_2 = start_part_2.elapsed();

    // -------------------------------------------------------------------------
    // Return
    // -------------------------------------------------------------------------
    Results::new(
        count_1 as i64,
        count_2 as i64,
        Timing::new(
            time_setup,
            time_part_1,
            time_part_2,
            std::time::Duration::new(0, 0),
        ),
    )
}

// -----------------------------------------------------------------------------
// Report
// -----------------------------------------------------------------------------
pub(crate) fn report(results: &Results) {
    output::print_day(24, "Lobby Layout");
    output::print_part(1, "🏨 Count", &format!("{}", results.part_1));
    output::print_part(2, "🏨 Count", &format!("{}", results.part_2));
    output::print_timing(&results.times);
}

// -----------------------------------------------------------------------------
