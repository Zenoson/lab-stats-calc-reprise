function readAllNumbers() : number[] {
    let textArea = document.querySelector("textarea") as HTMLTextAreaElement;
    let lines : string[] = textArea.value.split("\n");
    let numbers : number[] = [];

    //Step 4: update to handle multiple numbers on one line

    for (let i = 0; i < lines.length; i++){
        if (lines[i] === "")
            continue;
        let temp : string[] = lines[i].split(" ")
        for (let j = 0; j < temp.length; j++) {
            if (temp[j] == "")
                continue;
            numbers.push(Number(temp[j]))
        }
    }

    return numbers;
}

function getMean( nums  : number[]) : number {
    let sum = 0;
    for (const n of nums){
        sum += n;
    }
    return Number((sum / nums.length).toFixed(2));
}

function getAboveBelowMean(nums : number[]) : [number, number] {
    let mean = getMean(nums);
    let aboveCount = 0;
    let belowCount = 0;
    for (const n of nums){
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}

// PART A : Basic Stats

function getMedian(nums : number[]) : number {
    //Step 1
    return nums.length % 2 ? nums[(nums.length + 1)/2 -1] : (nums[nums.length/2] + nums[nums.length/2 - 1]) / 2;
}

function getMinMax(nums : number[]) : [number, number] {
    //Step 2
    return [nums[0], nums[nums.length-1]];
}

function getStdDev(nums : number[]) : number {
    //Step 3
    let mean : number = getMean(nums);
    let std_dev : number[] = [];
    for (let i=0; i<nums.length; i++) {
        std_dev.push((mean-nums[i])**2);
    }
    return Number((getMean(std_dev) ** (1/2)).toFixed(2));
}

let basicStatsAnalyzeButton = document.querySelector("button#analyze") as HTMLButtonElement;
basicStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#mean") as HTMLElement).textContent = `${getMean(numbers)}`;    
    (document.querySelector("#aboveBelow") as HTMLElement).textContent = `${getAboveBelowMean(numbers).join(" & ")}`;
    (document.querySelector("#median") as HTMLElement).textContent = `${getMedian(numbers)}`;
    (document.querySelector("#minMax") as HTMLElement).textContent = `${getMinMax(numbers).join(" & ")}`;
    (document.querySelector("#stdDev") as HTMLElement).textContent = `${getStdDev(numbers)}`;
});

// PART B: Advanced Integer Stats

function getLeastCommonMultiple(nums : number[]) : number {
    let numToCheck : number = nums[nums.length-1];
    while (true) {
        let divisible : boolean = true;
        for (let l=0; l<nums.length; l++) {
            if (numToCheck % nums[l]) {
                divisible = false;
                continue;
            }
        }
        if (divisible === true) {
            return numToCheck;
        }
        numToCheck++
    }
}

function getAllCommonFactors(nums : number[]) : number[] {
    let commonFactors : number[] = [];
    for (let m=nums[0]; m>=1; m--) {
        let isCommonFactor : boolean = true;
        for (let l=0; l<nums.length; l++) {
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

let advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced") as HTMLButtonElement;
advancedStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#lcm") as HTMLElement).textContent = `${getLeastCommonMultiple(numbers)}`;
    (document.querySelector("#factors") as HTMLElement).textContent = `${getAllCommonFactors(numbers).join(", ")}`;
});
