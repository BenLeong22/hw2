// logic.js

//《———————————————MY CODE START————————————————————————————————————————————————》

function fill (tasks) {
  var tbody = $('table tbody');
  tbody.empty();
  for (atask of tasks) {
    var row = '<tr><td>'+changedow(atask.dow)+" "+atask.start+"-"+atask.end+'</td>';//Q2d
    row += checklab(atask.room);//Q2e
    row += '<td>'+atask.code+"  "+atask.title+'</td>';//Q2e
    row += '<td>'+atask.instructor+'</td>';//Q2e
    row += '</tr>';//Q2e
    var r = $(row);//Q2e

    console.log(atask)
    tbody.append(r);
  }
  var img = $('<img>').attr('src', 'lab.png').css("width",25,"height",25);
  $('.lab').append(img);  //Q2f

  weak =["Mon","Tue","Wed","Thu","Fri"]//Q2g
  color=["#D45D5D","#D49C5D","#62D45D","#5DD4AF","#5D9DD4"]//Q2g

  for(i=0;i<=4;i++){//Q2g
  $('.'+weak[i]).css("background-color",color[i]);//Q2g
}
}

function refreshTableByYear(val) {
  $.get('/getLectureByYear?year='+val, (data) => {
    //console.dir(data);
    fill(data.lectures);
  });
}

function refreshTableByRoom(val) {
  $.get('/getLectureByRoom?room='+val, (data) => {
    console.dir(data);
    fill(data.lectures);
  });
}

function changedow(val){      //Q2f
  switch(val){
    case 1:
      return '<span class="Mon">Mon</span>';
    case 2:
      return '<span class="Tue"">Tue</span>';
    case 3:
      return '<span class="Wed">Wed</span>';
    case 4:
      return '<span class="Thu">Thu</span>';
    case 5:
      return '<span class="Fri">Fri</span>';

      //Second Method
      // case 1:
      //   return '<span style="color:D45D5D;">Mon</span>';
      // case 2:
      //   return '<span style="color:D49C5D;">Tue</span>';
      // case 3:
      //   return '<span style="color:62D45D;">Wed</span>';
      // case 4:
      //   return '<span style="color:5DD4AF;">Thu</span>';
      // case 5:
      //   return '<span style="color:5D9DD4;">Fri</span>';

  }
}

function checklab(room){
  var labroom =["A202", "A203", "A205", "A210", "A211"]
  console.log("room"+room)

  for (var i of labroom){
    console.log(i)
    if (room == i){
      return '<td class="lab">'+room+'</td>'
    }
  }
  return '<td>'+room+'</td>'
}


$('#btn1').on('click', (e) => {       //Q2a

  var val = $("select").val()
  $('.searchCriteria').css('background-color','white')//Q2b
  $('.searchCriteria').eq(0).css('background-color','lightblue')//Q2b
  console.log(val)
  refreshTableByYear(val);

});


$('#btn2').on('click', (e) => {      //Q2b
  
    var val = $("input").val()
    $('.searchCriteria').css('background-color','white')//Q2b
    $('.searchCriteria').eq(1).css('background-color','lightblue')//Q2b
    console.log(val)
    refreshTableByRoom(val);

});

//《———————————————MY CODE END————————————————————————————————————————————————》

