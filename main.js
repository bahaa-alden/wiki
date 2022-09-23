const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

// list=search - perform a full text search
// srsearch="inputValue" - search for page titles or content matching  this value.
// srlimit=20 How many total pages to return.
// format=json json response
// "origin=*" fix cors errors
const page_url = `http://en.wikipedia.org/?curid=`;
let form = document.forms[0];
let ids = [];
let i = 0;
let input = document.querySelector(".sa");
let wrapper = document.querySelector(".wrapper");
form.onsubmit = async function (e) {
  if (input.value === "") {
    e.preventDefault();
  } else if (input.value.length < 60) {
    wrapper.innerHTML = `<div class=loading></div>`;
    try {
      let pages = await fetchUrl(`${url}${input.value}`);
      if (pages.length < 1) {
        wrapper.innerHTML = "";

        wrapper.innerHTML = `<div class=error>Please enter a valid value</div>`;
      } else {
        wrapper.innerHTML = "";
        console.log(pages);
        for (const iterator of pages) {
          wrapper.innerHTML += `<a href=${page_url}${iterator.pageid} class=contents><h2>${iterator["title"]}</h2><p>${iterator["snippet"]}</p></a>`;
        }
      }
      input.value = "";
    } catch {
      wrapper.innerHTML = "";
      wrapper.innerHTML = `<div class=error>There is an error</div>`;
    } finally {
      console.log("done");
    }
  } else {
    wrapper.innerHTML = "";
    wrapper.innerHTML = `<div class=error>There is to much words</div>`;
  }
};

async function fetchUrl(url) {
  let b = await (await fetch(url)).json();
  return b["query"]["search"];
}
// async fetchpages(page_url)
