
    
    const getThumb =  (url:string, size?:string) => {
        let video, results;
        if (url === null) {
            return '';
        }
        size    = (size === null) ? 'big' : size;
        results = url.match('[\\?&]v=([^&#]*)');
        video   = (results === null) ? url : results[1];

        if (size === 'small') {
            return 'http://img.youtube.com/vi/' + video + '/2.jpg';
        }
        return 'http://img.youtube.com/vi/' + video + '/0.jpg';
    };

   export default getThumb; 
//Example of usage:

// const thumb = Youtube.thumb('http://www.youtube.com/watch?v=F4rBAf1wbq4', 'small');

// console.log(thumb);