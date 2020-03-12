
///////////////////////
// Utility functions //
///////////////////////

const PROXY_URL = "http://127.0.0.1:3001"
const PERSONAS_KEY = "pvIK29PdLK8WzSo81b3eEXm2zi6FXP42PmgoYSyK3b_gE3BptlbrVblD9frjvNFnDNZjU7Cw44Q66nX6JrPrgMPViCJGuU0ZHifhJ3H4TUW02d40hf-d2S0NAs2s3CqwxWYQ6ui99SKi_wmCL6TZ6iM_0hEWPosT-2pgUvztjUY-ZC5Cuh86PHBayAsaIXvExm1O8vFHkeb-"
const PERSONAS_WORKSPACE = "RwyNCE7ZZN"

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function drawPersonalization(traits) {
  document.write(JSON.stringify(traits));
}

function getTraits(id, callback) {
  const PersonasTraitURL = "/v1/spaces/RwyNCE7ZZN/collections/users/profiles/email:timothymorse@example.net/traits"

  $.ajax({
      url: PROXY_URL+PersonasTraitURL,
      type: 'GET',
      data: {},
      headers: {
          "Authorization": 'Basic ' + PERSONAS_KEY,   //If your header name has spaces or any other char not appropriate
      },
      dataType: 'json',
      success: function (data) {
          console.info(data);
          drawPersonalization(data);
      }
  });
}

function runPersonalization(id) {
  getTraits(id,drawPersonalization);
}



// function getPersona() {
//   xhr = new XMLHttpRequest();
//   xhr.open('POST', "http://localhost:3001/", true);
//   xhr.send();
//   xhr.onreadystatechange = processRequest;
// }
//
// function processRequest(e) {
//   if (xhr.readyState == 4 && xhr.status == 200) {
//     var response = JSON.parse(xhr.responseText);
//     profilesProxyRes = response;
//     if(profilesProxyRes.productIdList.length && profilesProxyRes.productIdList["0"]!="") {
//       $( "div.fav-pbnjay-header" ).fadeIn (1000);
//       $( "div.fav-pbnjay-container" ).html($( "div.fav-pbnjay-container-"+profilesProxyRes.productIdList["0"] ).html());
//       $( "div.fav-pbnjay-container" ).slideDown (1000);
//     } else {
//
//     }
//     console.log(JSON.stringify(response));
//   }
// }


var currentAnonymousId = unescape(getCookie('ajs_anonymous_id')).replace(/['"]+/g, '');

////////////////////
// Main functions //
////////////////////

jQuery(document).ready(function () {
  window.scrollTo(0,0);
  if(currentAnonymousId) {
    runPersonalization(currentAnonymousId);
  } else {
    console.log('No anonymous_id set!');
  }

});

console.log('AnonymousID: ' + currentAnonymousId);
