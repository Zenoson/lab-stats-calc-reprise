"use strict";
function readAllNumbers() {
    let textArea = document.querySelector("textarea");
    let lines = textArea.value.split("\n");
    let numbers = [];
    //Step 4: update to handle multiple numbers on one line
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === "")
            continue;
        let temp = lines[i].split(" ");
        for (let j = 0; j < temp.length; j++) {
            if (temp[j] == "")
                continue;
            numbers.push(Number(temp[j]));
        }
    }
    return numbers;
}
function getMean(nums) {
    let sum = 0;
    for (const n of nums) {
        sum += n;
    }
    return Number((sum / nums.length).toFixed(2));
}
function getAboveBelowMean(nums) {
    let mean = getMean(nums);
    let aboveCount = 0;
    let belowCount = 0;
    for (const n of nums) {
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}
// PART A : Basic Stats
function getMedian(nums) {
    //Step 1
    return nums.length % 2 ? nums[(nums.length + 1) / 2 - 1] : (nums[nums.length / 2] + nums[nums.length / 2 - 1]) / 2;
}
function getMinMax(nums) {
    //Step 2
    return [nums[0], nums[nums.length - 1]];
}
function getStdDev(nums) {
    //Step 3
    let mean = getMean(nums);
    let std_dev = [];
    for (let i = 0; i < nums.length; i++) {
        std_dev.push((mean - nums[i]) ** 2);
    }
    return Number((getMean(std_dev) ** (1 / 2)).toFixed(2));
}
let basicStatsAnalyzeButton = document.querySelector("button#analyze");
basicStatsAnalyzeButton.addEventListener("click", function () {
    let numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    document.querySelector("#mean").textContent = `${getMean(numbers)}`;
    document.querySelector("#aboveBelow").textContent = `${getAboveBelowMean(numbers).join(" & ")}`;
    document.querySelector("#median").textContent = `${getMedian(numbers)}`;
    document.querySelector("#minMax").textContent = `${getMinMax(numbers).join(" & ")}`;
    document.querySelector("#stdDev").textContent = `${getStdDev(numbers)}`;
});
// PART B: Advanced Integer Stats
function getLeastCommonMultiple(nums) {
    let numToCheck = nums[nums.length - 1];
    while (true) {
        let divisible = true;
        for (let l = 0; l < nums.length; l++) {
            if (numToCheck % nums[l]) {
                divisible = false;
                continue;
            }
        }
        if (divisible === true) {
            return numToCheck;
        }
        numToCheck++;
    }
}
function getAllCommonFactors(nums) {
    let commonFactors = [];
    for (let m = nums[0]; m >= 1; m--) {
        let isCommonFactor = true;
        for (let l = 0; l < nums.length; l++) {
            if (nums[l] % m) {
                isCommonFactor = false;
                continue;
            }
        }
        if (isCommonFactor) {
            commonFactors.push(m);
        }
    }
    return commonFactors;
}
let advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced");
advancedStatsAnalyzeButton.addEventListener("click", function () {
    let numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    document.querySelector("#lcm").textContent = `${getLeastCommonMultiple(numbers)}`;
    document.querySelector("#factors").textContent = `${getAllCommonFactors(numbers).join(", ")}`;
});
