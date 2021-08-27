const bdayInput = document.querySelector(".bday-input");
const showBtn = document.querySelector(".show-btn");
const output = document.querySelector("#output");
showBtn.addEventListener("click", clickHandler);

function reverseString(str) {
  var revStr = str.split("").reverse().join("");
  return revStr;
}

function isStrPalindrome(str) {
  var reversedStr = reverseString(str);
  return str === reversedStr;
}

function dateToString(userDate) {
  var dateInStr = {
    day: "",
    month: "",
    year: "",
  };
  if (userDate.day < 10) {
    dateInStr.day = "0" + userDate.day;
  } else {
    dateInStr.day = userDate.day.toString();
  }
  if (userDate.month < 10) {
    dateInStr.month = "0" + userDate.month;
  } else {
    dateInStr.month = userDate.month.toString();
  }
  dateInStr.year = userDate.year.toString();

  return dateInStr;
}

function getAlldateFormats(userDate) {
  var ddmmyyyy = userDate.day + userDate.month + userDate.year;
  var mmddyyyy = userDate.month + userDate.day + userDate.year;
  var yyyymmdd = userDate.year + userDate.month + userDate.day;
  var ddmmyy = userDate.day + userDate.month + userDate.year.slice(-2);
  var mmddyy = userDate.month + userDate.day + userDate.year.slice(-2);
  var yyddmm = userDate.year.slice(-2) + userDate.month + userDate.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllFormats(userDate) {
  var dateFormatList = getAlldateFormats(userDate);
  var palindromeList = [];
  for (var i = 0; i < dateFormatList.length; i++) {
    var ans = isStrPalindrome(dateFormatList[i]);
    palindromeList.push(ans);
  }
  return palindromeList;
}

function isLeapYear(birthYear) {
  if ((birthYear % 4 == 0 && birthYear % 100 != 0) || birthYear % 400 == 0) {
    return true;
  } else {
    false;
  }
}

function getNextDate(userDate) {
  var day = userDate.day + 1;
  var month = userDate.month;
  var year = userDate.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month == 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
    if (month > 12) {
      month = 1;
      year++;
    }
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function nextPalindromeDate(userDate) {
  var count1 = 0;
  var nextDate = getNextDate(userDate);

  while (1) {
    count1++;
    var dateStr = dateToString(nextDate);
    var ansList = checkPalindromeForAllFormats(dateStr);

    for (var i = 0; i < ansList.length; i++) {
      if (ansList[i]) {
        return [count1, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function getPrevDate(userDate) {
  var day = userDate.day - 1;
  var month = userDate.month;
  var year = userDate.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day == 0) {
    month--;

    if (month == 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month == 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPrevPalindromeDate(userDate) {
  var prevDate = getPrevDate(userDate);
  var count2 = 0;

  while (1) {
    count2++;
    var dateStr = dateToString(prevDate);
    var ansList = checkPalindromeForAllFormats(dateStr);

    for (var i = 0; i < ansList.length; i++) {
      if (ansList[i]) {
        return [count2, prevDate];
      }
    }
    prevDate = getPrevDate(prevDate);
  }
}

function clickHandler(event) {
 
  var bdayStr = bdayInput.value;

  if (bdayStr !== "") {
    var userDate = bdayStr.split("-");
    var yyyy = userDate[0];
    var mm = userDate[1];
    var dd = userDate[2];

    var userDate = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    };

    var dateStr = dateToString(userDate);
    var dateList = checkPalindromeForAllFormats(dateStr);
    var yesPalindrome = false;

    for (let i = 0; i < dateList.length; i++) {
      if (dateList[i]) {
        yesPalindrome = true;
        break;
      }
    }

    if (!yesPalindrome) {
      const [count1, nextDate] = nextPalindromeDate(userDate);
      const [count2, prevDate] = getPrevPalindromeDate(userDate);
      let message = "";
      if (count1 < count2) {
        message = 
          "The Nearest Palindrome date is " +
          nextDate.day +
          "-" +
          nextDate.month +
          "-" +
          nextDate.year +
          " , you missed by " +
          count1 +
          " days";
        showOutput(message);
      } else {
        message =
          "The Nearest Palindrome date is " +
          prevDate.day +
          "-" +
          prevDate.month +
          "-" +
          prevDate.year +
          " , you missed by " +
          count2 +
          " days";
        showOutput(message);
      }
    } else {
      message = "Yay! Your Birthday is palindrome 🎉🎉";
      showOutput(message);
    }
  }else{
    message = "Please enter your Birth Date";
    showOutput(message)
  }
}

function showOutput(message) {
  output.innerText = message;
}