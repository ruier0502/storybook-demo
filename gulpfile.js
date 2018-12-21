// import { specs} from 'storybook-addon-specifications';
const gulp = require('gulp');
const {specs} = require('storybook-addon-specifications');
const fs = require('fs');


gulp.task('test', async () => {
    // 将你的默认的任务代码放在这
    fs.readFile('./stories/button.test.js', function(err,data){
        if(err){
            console.log(err);
        }else{
            specs(() => data)
        }
    });
    // let stream = gulp.src('./story/*.test.js', { read: false })
    //     .pipe(() => {

    // });
    // console.log(specs);
});