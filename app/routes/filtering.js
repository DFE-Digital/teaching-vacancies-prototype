

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
        } else if (location !== ''){
            res.redirect('jobs/search/applications')
        }
        else {
            res.redirect('jobs/search/applications')
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
        } else if (location !== ''){
            res.redirect('/jobs/search/location')
        }
        else {
            res.redirect('/jobs/search/relevant')
        }
    })

    router.post('/jobs/search/location', (req, res) => {
        //get location so we know if we should sort by postcode or city/other
        var location = req.session.data['location']
        //detect if the location field has a number in, to determine if it does include a postcode      
        // Regular expression pattern to match any number
        var numberPattern = /\d+/;
        // Check if the variable contains any number using test()
         if (numberPattern.test(location)) {
            res.redirect('/jobs/search/postcode')
        } else if (location !== ''){
            res.redirect('/jobs/search/location')
        }
        else {
            res.redirect('/jobs/search/relevant')
        }
    })

    router.post('/jobs/search/relevant', (req, res) => {
        //get location so we know if we should sort by postcode or city/other
        var location = req.session.data['location']
        //detect if the location field has a number in, to determine if it does include a postcode      
        // Regular expression pattern to match any number
        var numberPattern = /\d+/;
        // Check if the variable contains any number using test()
         if (numberPattern.test(location)) {
            res.redirect('/jobs/search/postcode')
        } else if (location !== ''){
            res.redirect('/jobs/search/location')
        }
        else {
            res.redirect('/jobs/search/relevant')
        }
    })

    router.post('/jobs/search/closing', (req, res) => {
        //get location so we know if we should sort by postcode or city/other
        var location = req.session.data['location']
        //detect if the location field has a number in, to determine if it does include a postcode      
        // Regular expression pattern to match any number
        var numberPattern = /\d+/;
        // Check if the variable contains any number using test()
         if (numberPattern.test(location)) {
            res.redirect('/jobs/search/postcode')
        } else if (location !== ''){
            res.redirect('/jobs/search/location')
        }
        else {
            res.redirect('/jobs/search/relevant')
        }
    })

    router.get('/jobs/search/postcode', (req, res) => {
        let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
        res.render('jobs/search/postcode', {
        jobs
        })
    })

    router.get('/jobs/search/location', (req, res) => {
        let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
        res.render('jobs/search/location', {
        jobs
        })
    })

    router.get('/jobs/search/relevant', (req, res) => {
        let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
        res.render('jobs/search/relevant', {
        jobs
        })
    })

    router.get('/jobs/search/closing', (req, res) => {
        let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
        res.render('jobs/search/closing', {
        jobs
        })
    })


    router.get('/search/applications', (req, res) => {
        let jobs = req.session.data.jobs.filter(job => job.status == 'Active')

        res.render('jobs/search/filter', {
            jobs
        })
    })

    //only use home search to pre-select filters

    router.get('/search/home', (req, res) => {
        let jobs = req.session.data.jobs.filter(job => job.status == 'Active')

        res.render('jobs/search/filter', {
            jobs
        })
    })

    router.get('/clear-filters', (req, res) => {
       
        req.session.data['filter-role'] = '';
        req.session.data['keywords'] = '';
        req.session.data['location'] = '';

        res.redirect('/jobs')
    })




}