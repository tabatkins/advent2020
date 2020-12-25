initSidebarItems({"constant":[["REPETITIONS",""]],"fn":[["main",""]],"mod":[["day01","Day 1: This solution uses a binary mask array that contains the values between 1 and 2020 found in the challenge input. I read the values into a mask array and load the values into a vector at the same time to reduce the memory movement."],["day02","Day 2: Regex can be expensive to create. I leveraged information about the structure of the input file to avoid using a regex. Note that `splitn` tends to be faster than `split`. Also, processing both parts in a single pass over the array saves roughly 20% time."],["day03","Day 3: An important observation from today is that you get better performance from a combined map and fold/for_each that you get from chaining the two."],["day04","Day 4: Interestingly, in contrast to Day 3, we achieve better performance by mapping before folding in this case. This is another good example of where `splitn` outperforms `split`, even if some strings have fewer than n chunks. It seems that parsing the passport is complex enough that combining is not as important."],["day05","Day 5: Two separate passes are required over the data, one to convert from a string to a binary and one to find the valid seat. However, we can still save some time by locating the max seat while filling the binary seat array"],["day06","Day 6: This is a good example of how using the bytes array for each string can speed up comparisons and parsing. Of note here, it is faster to map and then fold in the combined section."],["day07","Day 7: A particularly slow day, the performance is dominated by adding each bag to a graph. Once the input has been parsed, traversing the graph to find the contained/containing bags is straightforward and fast. Switching to the rustc hasher helped trim some time."],["day08","Day 8: This is a problem that is not actually dominated by the cost of parsing the input. The problem is best solved by working from the last instruction before the infinite loop and working backwards. Any visit of previous nodes in the loop will signal entering the loop again, so we can reuse the same hash set when we combine the parts. Note that this is very messy code that should be cleaned up."],["day09","Day 9: The parts are difficult (or impossible) to combine in this problem. Some approaches, such as using hash sets, offer better theoretical accuracy, but in practice I am seeing that using fixed sized arrays is offering the compiler plenty of chances to produce fast code."],["day10","Day 10: The only tricks in this one are using a mask array to sort the input and counting the unique combinations from the end of the array. This is a good example of a problem where the fastest approach to each part walks the data in a different direction and cannot be combined."],["day11","Day 11: This puzzle is similar to Conway's Game of Life. As such, I have taken some hints from optimized Game of Life simulations. Specifically, I precompute the indices to check for each day, and I maintain a reducing list of seats to recheck. Of note, I discovered that retain is faster than filter if you are keeping the vector modified. Adding a halo of empty seats around the map simplifies the code and makes it easier to vectorize."],["day12","Day 12: Another straightforward problem today. As usual, for these easier problems parsing the data is expensive. Since the trig is only by 90 degrees, it is faster to just directly handle the rotation matrix effects in part 2."],["day13","Day 13: This is a fast one so long as you use the Chinese Remainder Theorem and modular arithmetic. Nothing particularly noteworthy in the code."],["day14","Day 14: The bitwise operations are straightforward, but the combinatorics make this tricky. 64 bit integers are slower to work with, and my current solution to Part 2 is slow in hitting all required floating mask values. I sum the data as I walk the list, visiting the instructions in reverse, to avoid repetition in traversing the map."],["day15","Day 15: Nothing clever here. I am using a vec for the dense portion of the integers and a hash map for the sparse portion of the integers."],["day16","Day 16: The range checking is somewhat expensive in this problem. I imagine there is a better way to organize the data for finding the rules, but I haven't put much thought into it yet."],["day17","Day 17: I have experimented with maintaining a hash set of only the active nodes, but this turned into an interesting example where doing lots of the same task is faster than some special case logic to reduce the total FLOPs. In the 4D case, the final solution uses ~1% of the cells, but trying to target active cells and neighbors took 10x longer on my machine. I did use symmetry in the 3rd and 4th dimension to reduce the computation by a factor of nearly 2 and 4, respectively."],["day18","Day 18: Part 1 was a straightforward right-to-left traversal of the lines. For Part 2 I executed all + in the right-to-left traversal and then took the product of the resulting sums. I was able to take some shortcuts based on my knowledge of the input structure that I would not otherwise be able to do, like knowing the numbers are all one character long and knowing the distribution of the spaces."],["day19","Day 19: CYK is a good fit here, but with the size of the strings, the arrays are quite large. I looked around at some other solutions and tried this new recursive, top-down approach which works much better."],["day20","Day 20: Well then. That was hard, but the overall implementation was somewhat fast."],["day21","Day 21: No particular tricks in this one. As usual, we can get a mild improvement by reading and consuming the data at the same time."],["day22","Day 22: Part 1 was straighforward. I got good performance by using fixed sized arary and indexing in with modular arithmetic. For Part 2, I continued this approach. For visited configurations of the game, I hashed Player 1's deck to a single u64, hashed Player 2's deck to a single u64, and hashed the two values to create a single u64 representing the current game configuration. I updated the code to use a max number of rounds rather than checking for a repeated state. This is a cheat, but it works."],["day23","Day 23: Another \"do the same thing millions of times\" challenge. Using arrays instead of vectors would be faster, but that large of arrays can overflow the stack for the test suite."],["day24","Day 24: Game of Life on a hexagonal grid. I largely recycled older code, with some new code for parsing a line into a location onto a 2D hexagonal coordinate system. Of note is shifting my iteration loop so I am always indexing with an offset into my boolean tile array, letting me avoid casting back and forth between signed and unsigned integers."],["day25","Day 25: For this puzzle I used the baby step, giant step algorithm to compute the discrete logarithm. With a known base and modulus, I hard-coded the prerequsite values for the algorithm."],["output","Output: This module collects some of my `println!` boilerplate between the days."],["prelude",""]],"struct":[["Results",""],["Timing",""]]});