const save = document.querySelector('button[type="submit"]');
const section = document.querySelector("body section");
let timeSortBtn = document.querySelector("#sort-menu li:first-child");
let importSortBtn = document.querySelector("#sort-menu li:last-child");

// 每次開啟頁面都要先跑這個函數
loadData();

$(".add-btn").on("click", function () {
  $("form").slideDown(700);
  this.classList.add("active");
});

$("form button[type='button']").click(function () {
  $("form").slideUp(700);
  $(".add-btn").removeClass("active");
});

save.addEventListener("click", (e) => {
  e.preventDefault();

  // get input values
  let data = document.querySelectorAll(".todo-value");

  // check values aren't empty and set values
  if (
    data[0].value === "" ||
    data[1].value === "" ||
    data[2].value === "" ||
    data[3].value === ""
  ) {
    alert("欄位不可留白!!");
    return;
  }

  let data_important = data[0].value;
  let data_title = data[1].value;
  let data_time = data[2].value;
  let data_timeArray = data_time.split("-");
  let data_timeOfYear = data_timeArray[0];
  let data_timeOfMonth = data_timeArray[1];
  let data_timeOfDay = data_timeArray[2];
  let data_text = data[3].value;
  $("form").slideUp(700);
  $(".add-btn").removeClass("active");

  // create card
  let card = document.createElement("div");
  let cardHeader = document.createElement("div");
  let headerTitle = document.createElement("div");
  let titleIcon = document.createElement("i");
  let titleText = document.createElement("h5");
  let headerDate = document.createElement("div");
  let dateText = document.createElement("p");
  let cardBody = document.createElement("div");
  let bodyText = document.createElement("p");
  let cardActive = document.createElement("ul");
  let activeComplete = document.createElement("li");
  let activeDelete = document.createElement("li");

  // name card's components class
  card.className = "card mb-4 mx-auto";
  cardHeader.className = "card-header d-flex flex-column flex-md-row pb-md-0";
  headerTitle.className = "title d-flex d-md-inline-flex";
  titleIcon.className = `bi bi-circle-fill ${data_important} me-2`;
  titleText.className = "fw-bold";
  headerDate.className = "date lh-1 ms-md-auto mt-md-auto";
  dateText.className = "m-0 fs-6";
  cardBody.className = "card-body";
  bodyText.className = "card-text";
  cardActive.className =
    "card-modify ps-0 m-0 d-flex justify-content-around fs-3";
  activeComplete.className =
    "text-center col-6 border-secondary border-top border-end";
  activeDelete.className = "text-center col-6 border-secondary border-top";

  // add variable
  titleText.innerText = data_title;
  dateText.innerText = `${data_timeOfYear}/${data_timeOfMonth}/${data_timeOfDay}`;
  bodyText.innerText = data_text;

  // add innerHtml
  activeComplete.innerHTML = `<i class="bi bi-check-square"></i>
  <p class="fs-6 mb-1 d-md-none">完成</p>`;
  activeDelete.innerHTML = `<i class="bi bi-trash-fill"></i>
  <p class="fs-6 mb-1 d-md-none">刪除</p>`;

  // append into container
  headerTitle.appendChild(titleIcon);
  headerTitle.appendChild(titleText);
  headerDate.appendChild(dateText);
  cardHeader.appendChild(headerTitle);
  cardHeader.appendChild(headerDate);
  cardBody.appendChild(bodyText);
  cardActive.appendChild(activeComplete);
  cardActive.appendChild(activeDelete);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  card.appendChild(cardActive);
  section.appendChild(card);

  // active when press complete button
  activeComplete.addEventListener("click", (e) => {
    let thisCard = e.target.parentElement.parentElement;

    if (thisCard.classList.contains("isComplete")) {
      thisCard.classList.remove("isComplete");
    } else {
      thisCard.classList.add("isComplete");
    }
  });

  // active when press delete button
  activeDelete.addEventListener("click", (e) => {
    let thisCard = e.target.parentElement.parentElement;
    let cardsParent = thisCard.parentElement;
    thisCard.classList.add("delete");
    for (let i = 0; i < cardsParent.children.length; i++) {
      if (cardsParent.children[i].classList.contains("delete")) {
        cardsParent.children[i].style =
          "transition: 0.5s; transform: scale(0);";

        thisCard.addEventListener("transitionend", function () {
          let dataArray = JSON.parse(localStorage.getItem("list"));
          dataArray.splice(i, 1);
          localStorage.setItem("list", JSON.stringify(dataArray));

          thisCard.remove();
        });
      }
    }
  });

  // make an object
  data_object = {
    data_important: data_important,
    data_title: data_title,
    data_timeOfYear: data_timeOfYear,
    data_timeOfMonth: data_timeOfMonth,
    data_timeOfDay: data_timeOfDay,
    data_text: data_text,
  };

  // set a local storage to save user's data
  let dataList = localStorage.getItem("list");
  if (dataList == null) {
    localStorage.setItem("list", JSON.stringify([data_object]));
  } else {
    let dataArray = JSON.parse(dataList);
    dataArray.push(data_object);
    localStorage.setItem("list", JSON.stringify(dataArray));
  }

  data.forEach((e) => {
    e.value = "";
  });
});

function loadData() {
  let dataList = localStorage.getItem("list");
  if (dataList !== null) {
    let dataArray = JSON.parse(dataList);
    dataArray.forEach((element) => {
      // create card
      let card = document.createElement("div");
      let cardHeader = document.createElement("div");
      let headerTitle = document.createElement("div");
      let titleIcon = document.createElement("i");
      let titleText = document.createElement("h5");
      let headerDate = document.createElement("div");
      let dateText = document.createElement("p");
      let cardBody = document.createElement("div");
      let bodyText = document.createElement("p");
      let cardActive = document.createElement("ul");
      let activeComplete = document.createElement("li");
      let activeDelete = document.createElement("li");

      // name card's components class
      card.className = "card mb-4 mx-auto";
      cardHeader.className =
        "card-header d-flex flex-column flex-md-row pb-md-0";
      headerTitle.className = "title d-flex d-md-inline-flex";
      titleIcon.className = `bi bi-circle-fill ${element.data_important} me-2`;
      titleText.className = "fw-bold";
      headerDate.className = "date lh-1 ms-md-auto mt-md-auto";
      dateText.className = "m-0 fs-6";
      cardBody.className = "card-body";
      bodyText.className = "card-text";
      cardActive.className =
        "card-modify ps-0 m-0 d-flex justify-content-around fs-3";
      activeComplete.className =
        "text-center col-6 border-secondary border-top border-end";
      activeDelete.className = "text-center col-6 border-secondary border-top";

      // add variable
      titleText.innerText = element.data_title;
      dateText.innerText = `${element.data_timeOfYear}-${element.data_timeOfMonth}-${element.data_timeOfDay}`;
      bodyText.innerText = element.data_text;

      // add innerHtml
      activeComplete.innerHTML = `<i class="bi bi-check-square"></i>
      <p class="fs-6 mb-1 d-md-none">完成</p>`;
      activeDelete.innerHTML = `<i class="bi bi-trash-fill"></i>
      <p class="fs-6 mb-1 d-md-none">刪除</p>`;

      // append into container
      headerTitle.appendChild(titleIcon);
      headerTitle.appendChild(titleText);
      headerDate.appendChild(dateText);
      cardHeader.appendChild(headerTitle);
      cardHeader.appendChild(headerDate);
      cardBody.appendChild(bodyText);
      cardActive.appendChild(activeComplete);
      cardActive.appendChild(activeDelete);

      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      card.appendChild(cardActive);
      section.appendChild(card);

      // active when press complete button
      activeComplete.addEventListener("click", (e) => {
        let thisCard = e.target.parentElement.parentElement;

        if (thisCard.classList.contains("isComplete")) {
          thisCard.classList.remove("isComplete");
        } else {
          thisCard.classList.add("isComplete");
        }
      });

      // active when press delete button
      activeDelete.addEventListener("click", (e) => {
        let thisCard = e.target.parentElement.parentElement;
        let cardsParent = thisCard.parentElement;
        thisCard.classList.add("delete");
        for (let i = 0; i < cardsParent.children.length; i++) {
          if (cardsParent.children[i].classList.contains("delete")) {
            cardsParent.children[i].style =
              "transition: 0.5s; transform: scale(0);";
            thisCard.addEventListener("transitionend", function () {
              let dataArray = JSON.parse(localStorage.getItem("list"));
              dataArray.splice(i, 1);
              localStorage.setItem("list", JSON.stringify(dataArray));
              thisCard.remove();
            });
          }
        }
      });
    });
  }
}

function mergeCompereTime(arr1, arr2) {
  let timeResult = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    // compere year for first
    if (arr1[i].data_timeOfYear < arr2[j].data_timeOfYear) {
      timeResult.push(arr1[i]);
      i++;
    } else if (arr1[i].data_timeOfYear > arr2[j].data_timeOfYear) {
      timeResult.push(arr2[j]);
      j++;
    } else if (arr1[i].data_timeOfYear == arr2[j].data_timeOfYear) {
      // when same year compere month for second
      if (arr1[i].data_timeOfMonth < arr2[j].data_timeOfMonth) {
        timeResult.push(arr1[i]);
        i++;
      } else if (arr1[i].data_timeOfMonth > arr2[j].data_timeOfMonth) {
        timeResult.push(arr2[j]);
        j++;
      } else if (arr1[i].data_timeOfMonth == arr2[j].data_timeOfMonth) {
        // when same year and same month compere day for third
        if (arr1[i].data_timeOfDay < arr2[j].data_timeOfDay) {
          timeResult.push(arr1[i]);
          i++;
        } else {
          timeResult.push(arr2[j]);
          j++;
        }
      }
    }
  }

  while (i < arr1.length) {
    timeResult.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    timeResult.push(arr2[j]);
    j++;
  }

  return timeResult;
}

function mergeTimeSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let right = arr.slice(0, middle);
    let left = arr.slice(middle, arr.length);

    return mergeCompereTime(mergeTimeSort(right), mergeTimeSort(left));
  }
}

function sortColor(arr) {
  let redArray = [];
  let yellowArray = [];
  let greenArray = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].data_important == "danger") {
      redArray.push(arr[i]);
    } else if (arr[i].data_important == "waring") {
      yellowArray.push(arr[i]);
    } else {
      greenArray.push(arr[i]);
    }
  }

  let colorSortedArray = redArray.concat(yellowArray, greenArray);
  return colorSortedArray;
}

function mergeImportSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let right = arr.slice(0, middle);
    let left = arr.slice(middle, arr.length);

    return mergeCompereImport(mergeImportSort(right), mergeImportSort(left));
  }
}

timeSortBtn.addEventListener("click", () => {
  // sort local storage data
  let timeSortedArray = JSON.parse(localStorage.getItem("list"));
  localStorage.setItem("list", JSON.stringify(mergeTimeSort(timeSortedArray)));

  // 移除顯示在頁面上的舊資料
  let len = section.children.length;
  for (let i = 0; i < len; i++) {
    section.children[0].remove();
  }

  // 載入新排序過的資料
  loadData();
});

importSortBtn.addEventListener("click", () => {
  // sort local storage data
  let importSortedArray = JSON.parse(localStorage.getItem("list"));
  localStorage.setItem(
    "list",
    JSON.stringify(sortColor(mergeTimeSort(importSortedArray)))
  );

  // 移除顯示在頁面上的舊資料
  let len = section.children.length;
  for (let i = 0; i < len; i++) {
    section.children[0].remove();
  }

  // 載入新排序過的資料
  loadData();
});
