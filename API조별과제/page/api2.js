// yhmain.js
var VISION_API_KEY = "AIzaSyAqNtuYttmEqMqQJ-NSHoPi4V24_4mSBYY";
var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + VISION_API_KEY;

imagestring = null


function processFile (event) {
    var content = event.target.result;
    imagestring = content.replace('data:image/jpeg;base64,', '');
    img = document.getElementById("imgframe")
    img.src = content
  }

function uploadFiles(files){
    //var file = $('#fileform [name=fileField]')[0].files[0];
    var file = files[0];
    var reader = new FileReader();
    reader.onloadend = processFile

   
    reader.readAsDataURL(file);
    // console.log(reader)
  }

function Send() {
    var request = {
        requests: [{
          image: {
            content: imagestring
          },
          features: [{
            type: $('#fileform [name=type]').val(), // 'LABEL_DETECTION',
            maxResults: 200
          }]
        }]
      };

 
    $.ajax({
        type: "POST",
        url: CV_URL,
        headers : {
            "Accept" : "application/json",
        "Content-Type" :  "application/json" },
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8"
    }).done(displayJSON)
    .fail(function (error) {
        alert("!/error  js에서 에러발생: " + error);
    });
}

function displayJSON (data) {
    var contents = JSON.stringify(data, null, 4);
    $('#results').text(contents);

    // face detect인 경우만 해당됨

    dlabels = "\n"
    labels = data.responses[0].faceAnnotations[0]
    console.log(labels)
    dlabels += "웃음: " +  convertLikelihoodToNumber(labels.joyLikelihood) + "\n"
    dlabels += "화남: " +  convertLikelihoodToNumber(labels.angerLikelihood)  + "\n"
    dlabels += "슬픔: " +  convertLikelihoodToNumber(labels.sorrowLikelihood)  + "\n"
    dlabels += "놀람: " +  convertLikelihoodToNumber(labels.surpriseLikelihood)
    + "\n"
 
    // labels.forEach(function(label){
    //     dlabels += label.description + "\n"
    // })
    $('#resultr').text(dlabels);

    function convertLikelihoodToNumber(likelihood) {
      switch (likelihood) {
          case 'VERY_UNLIKELY':
              return 0;
          case 'UNLIKELY':
              return 1;
          case 'POSSIBLE':
              return 2;
          case 'LIKELY':
              return 3;
          case 'VERY_LIKELY':
              return 4;
          default:
              return -1; // 예상치 못한 경우
      }
  }
}