initSidebarItems({"constant":[["REPETITIONS",""]],"fn":[["main",""]],"mod":[["day01","Day 1: This solution uses a binary mask array that contains the values between 1 and 2020 found in the challenge input. I read the values into a mask array and load the values into a vector at the same time to reduce the memory movement."],["day02","Day 2: Regex can be expensive to create. I leveraged information about the structure of the input file to avoid using a regex. Note that `splitn` tends to be faster than `split`. Also, processing both parts in a single pass over the array saves roughly 20% time."],["day03","Day 3: An important observation from today is that you get better performance from a combined map and fold/for_each that you get from chaining the two."],["day04","Day 4: Interestingly, in contrast to Day 3, we achieve better performance by mapping before folding in this case. This is another good example of where `splitn` outperforms `split`, even if some strings have fewer than n chunks. It seems that parsing the passport is complex enough that combining is not as important."],["day05","Day 5: Two separate passes are required over the data, one to convert from a string to a binary and one to find the valid seat. However, we can still save some time by locating the max seat while filling the binary seat array"],["day06","Day 6: This is a good example of how using the bytes array for each string can speed up comparisons and parsing. Of note here, it is faster to map and then fold in the combined section."],["day07","Day 7: A particularly slow day, the performance is dominated by adding each bag to a graph. Once the input has been parsed, traversing the graph to find the contained/containing bags is straightforward and fast. Switching to the rustc hasher helped trim some time."],["day08","Day 8: This is a problem that is not actually dominated by the cost of parsing the input. The problem is best solved by working from the last instruction before the infinite loop and working backwards. Any visit of previous nodes in the loop will signal entering the loop again, so we can reuse the same hash set when we combine the parts. Note that this is very messy code that should be cleaned up."],["day09","Day 9: The parts are difficult (or impossible) to combine in this problem. Some approaches, such as using hash sets, offer better theoretical accuracy, but in practice I am seeing that using fixed sized arrays is offering the compiler plenty of chances to produce fast code."],["day10","Day 10: The only tricks in this one are using a mask array to sort the input and counting the unique combinations from the end of the array. This is a good example of a problem where the fastest approach to each part walks the data in a different direction and cannot be combined."],["output","Output: This module collects some of my `println!` boilerplate between the days."],["prelude",""]],"struct":[["Results",""],["Timing",""]]});