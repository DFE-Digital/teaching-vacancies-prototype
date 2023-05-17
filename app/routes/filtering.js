
module.exports = router => {


    router.post('/jobs', (req, res) => {

        //get location so we know if we should sort by postcode or city/other
        var location = req.session.data['location']

        //detect if the location field has a number in, to determine if it does include a postcode
        
        // Regular expression pattern to match any number
        var numberPattern = /\d+/;

        // Check if the variable contains any number using test()
        if (numberPattern.test(location)) {
            res.redirect('jobs/search/postcode')
        } else {
            res.redirect('jobs/search/location')
        }


    })

    router.post('/jobs/search/postcode', (req, res) => {

        //get location so we know if we should sort by postcode or city/other

        var location = req.session.data['location']

        //detect if the location field has a number in, to determine if it does include a postcode
        
        // Regular expression pattern to match any number
        var numberPattern = /\d+/;

        // Check if the variable contains any number using test()
        if (numberPattern.test(location)) {
            res.redirect('/jobs/search/postcode')
        } else {
            res.redirect('/jobs/search/location')
        }


    })

    router.get('/jobs/search/postcode', (req, res) => {
        let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
        res.render('jobs/search/postcode', {
        jobs
        })
    })




}