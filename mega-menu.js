$(document).ready(async function () {
  var megaMenu = [];
  await $.ajax({
    url: "mega-menu.json",
    success: function (result) {
      megaMenu = result;
    },
  });
  //desktop
  var sideTemplate = ``;
  megaMenu.forEach((item, index) => {
    sideTemplate += `<li class="mega__menu__side__item" id="${index}">
        <a href="${item.link}" class="mega__menu__side__link" >${item.name}</a>
    </li>`;
  });
  $(".mega__menu__side").append(sideTemplate);
  $(".mega__menu__btn").hover(function () {
    $(".mega__menu").fadeIn();
  });
  $(".nav").mouseleave(function () {
    $(".mega__menu").fadeOut();
  });
  $(".mega__menu__side__item").mouseenter(function () {
    var hoverItem = $(this).attr("id");
    var level1 = megaMenu[hoverItem];
    var itemsTemplate = ``;
    var level2template = ``;
    level1.children.forEach((item, index) => {
      level2template = ``;
      item.children.forEach((level2Child) => {
        level2template += `<li class="mega__menu__items__child__item" >
            <a href="${level2Child.link}" class="mega__menu__items__child__link" >${level2Child.name}</a>
        </li>`;
      });
      itemsTemplate += `<div class="mega__menu__items__container" id="${index}">
      <li class="mega__menu__items__item">
            <a href="${item.link}" class="mega__menu__items__link" >${item.name}</a>
      </li>
            ${level2template}
        </div>`;
    });
    $(".mega__menu__items").empty();
    $(".mega__menu__items").append(itemsTemplate);
  });
  //desktop
  //mobile

  var newList = [];
  var oldList = [
    {
      name: "خانه",
      link: "#",
    },
    {
      name: "درباره",
      link: "#",
    },
    {
      name: "دسته بندی",
      link: "#",
      children: megaMenu,
    },
  ];

  changeTemplate(oldList);
  function changeTemplate(list) {
    list.map((item, index) => {
      $(`.mega__menu__btn__mobile#${index}`) &&
        $(`.mega__menu__btn__mobile#${index}`).click(function () {
          var id = $(this).attr("id");
          newList = id ? list[id].children : megaMenu;
          var template = ``;
          newList.forEach((item, index) => {
            template += `<li class="nav__item mega__menu__btn__mobile " id="${
              item.children && item.children.length ? index : ""
            }">
            ${
              item.children && item.children.length
                ? '<i class="ri-arrow-drop-left-line"></i>'
                : ""
            }
                <a href="${item.link}" class="nav__link" >${item.name}</a>
            </li>`;
          });
          $("#nav-menu ul").empty();
          $("#nav-menu ul").append(template);
          oldList = list;
          changeTemplate(newList);
          oldList.length && $(".nav__return").show();
        });
    });
  }
  $(".nav__return").click(function () {
    newList = [];
    oldList = [
      {
        name: "خانه",
        link: "#",
      },
      {
        name: "درباره",
        link: "#",
      },
      {
        name: "دسته بندی",
        link: "#",
        children: megaMenu,
      },
    ];
    var template = ``;
    oldList.forEach((item, index) => {
      template += `<li class="nav__item mega__menu__btn__mobile " id="${
        item.children && item.children.length ? index : ""
      }">
      ${
        item.children && item.children.length
          ? '<i class="ri-arrow-drop-left-line"></i>'
          : ""
      }
          <a href="${item.link}" class="nav__link" >${item.name}</a>
      </li>`;
    });
    $("#nav-menu ul").empty();
    $("#nav-menu ul").append(template);
    oldList.length && $(".nav__return").hide();
    changeTemplate(oldList);
  });
  //mobile
});
