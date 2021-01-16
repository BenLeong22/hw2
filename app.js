// app.js - application server for assignment 2
const express = require('express')
const app = express()

const timetab = require('./timetab.js').timetab

const morgan = require('morgan')
app.use(morgan('short'))

app.get('/', (req, res) => {
  res.redirect('/index.html')
});

app.get('/getCourseByYear', (req, res) => {
  // omitted: sanity check of input parameter
  const year = parseInt(req.query.year)
  const coursesInTheYear = timetab.courses.filter((c)=>c.year===year)
  res.send( {
    count: coursesInTheYear.length,
    courses: coursesInTheYear
  } )
})


//《———————————————MY CODE START————————————————————————————————————————————————》

app.get('/getLectureByYear', (req, res) => {
  
  var check = req.query.year;
  if (/[1-4]/.test(check)===false) {
   
    res.status(400).end();
    return;
  }

  var	lect_Show_Year	=	[	];
  for	(course	of	timetab.courses)	{
    if (course.year ==req.query.year){
		for	(lec	of	course.lectures)	{
        var	x	=	{	year:	course.year	};
				x.code	=	course.code;
				x.title	=	course.title;
        x.instructor	=	course.instructor;
        x.room	=	lec.room;
        x.dow	=	lec.dow;
        x.start	=	lec.start;
        x.end	=	lec.end;
				lect_Show_Year.push(x);
    }
  }
}
  
lect_Show_Year.sort((x,y) => ((x.dow-y.dow)||x.start.localeCompare(y.start)) )

  res.status(200).send( {
    count:lect_Show_Year.length,
    lectures: lect_Show_Year
  })
})

app.get('/getLectureByRoom', (req, res) => {
  
  var	lect_Show_Room	=	[];

  var check = req.query.room;
  if (/A\d{3}/.test(check)===false) {
    // error in input parameters
    res.status(400).end();
    return;
  }

  for	(course	of	timetab.courses)	{
   
		for	(lec	of	course.lectures)	{
        if(lec.room == req.query.room){
          var	x	=	{	year:	course.year	};
          x.code	=	course.code;
          x.title	=	course.title;
          x.instructor	=	course.instructor;
          x.room	=	lec.room;
          x.dow	=	lec.dow;
          x.start	=	lec.start;
          x.end	=	lec.end;
          lect_Show_Room.push(x);
        }
    }
  }
  
  lect_Show_Room.sort((x,y) => ((x.dow-y.dow)||x.start.localeCompare(y.start)) )
  res.status(200).send( {
    count:lect_Show_Room.length,
    lectures: lect_Show_Room

  }) 
})

//《———————————————MY CODE END————————————————————————————————————————————————》

app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});