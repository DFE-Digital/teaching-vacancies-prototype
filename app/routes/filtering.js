

const londonBoroughNames = [
    'Bexley',
    'Havering',
    'Kensington and Chelsea',
    'Barnet',
    'Enfield',
    'Westminster'
]

const locationGroups = {
    'north west': [
        'Liverpool',
        'Greater Manchester',
        'Lancashire, Blackburn and Blackpool',
        'Cheshire East',
        'Cheshire West and Chester'
    ],
    'yorkshire and the humber': [
        'Sheffield',
        'Leeds',
        'Bradford',
        'Doncaster',
        'North Riding Of Yorkshire'
    ],
    'north east': [
        'Newcastle Upon Tyne',
        'Middlesbrough',
        'Sunderland',
        'North Tyneside',
        'Northumberland'
    ],
    'south east': [
        'Hampshire',
        'Surrey',
        'Kent and Medway',
        'West Sussex',
        'East Sussex, Brighton and Hove'
    ],
    'south west': [
        'Bristol',
        'Gloucestershire and Gloucester',
        'Devon, Plymouth and Torbay',
        'Cornwall',
        'Dorset, Bournemouth, Christchurch and Poole'
    ],
    'west midlands': [
        'Birmingham',
        'Worcestershire',
        'Shropshire and Telford and Wrekin',
        'Staffordshire and Stoke',
        'Warwickshire'
    ],
    'east midlands': [
        'Derby',
        'Nottingham',
        'Leicester',
        'Lincolnshire and Lincoln',
        'Northamptonshire and Northampton'
    ],
    'east of england': [
        'Essex, Southend and Thurrock',
        'Bedfordshire',
        'Hertfordshire',
        'Suffolk',
        'Norfolk'
    ]
}

function normalizeLocation(value) {
    return sanitizeLocationValue(value).toLowerCase()
}

function sanitizeLocationValue(value) {
    return (value || '')
        .toString()
        .replace(/^View\s+\d+\s*/i, '')
        .replace(/\s*jobs$/i, '')
        .trim()
}

function isLondonSearch(location) {
    return normalizeLocation(location) === 'london'
}

function buildBoroughHref(query, borough) {
    const params = new URLSearchParams()

    Object.keys(query || {}).forEach(key => {
        if (key === 'borough' || key === 'location') {
            return
        }

        const value = query[key]

        if (Array.isArray(value)) {
            value.forEach(item => params.append(key, item))
        } else if (value !== undefined && value !== null && value !== '') {
            params.set(key, value)
        }
    })

    params.set('location', 'London')
    params.set('borough', borough)

    return '/search/home?' + params.toString()
}

function buildLondonBoroughs(jobs, query) {
    return londonBoroughNames.map(name => {
        const boroughJobs = jobs.filter(job => job.borough === name)

        return {
            name,
            count: boroughJobs.length,
            sampleJob: boroughJobs[0] || null,
            href: buildBoroughHref(query, name)
        }
    }).filter(borough => borough.count > 0)
}

function locationMatchesJob(job, location, borough) {
    const selectedLocation = normalizeLocation(location)
    const selectedBorough = normalizeLocation(borough)
    const jobTown = normalizeLocation(job.organisation && job.organisation.address && job.organisation.address.town)
    const jobBorough = normalizeLocation(job.borough)

    if (!selectedLocation) {
        return true
    }

    if (selectedLocation === 'london') {
        if (selectedBorough) {
            return jobTown === selectedBorough || jobBorough === selectedBorough
        }

        return jobTown === 'london' || londonBoroughNames.some(name => {
            const normalizedName = normalizeLocation(name)
            return jobTown === normalizedName || jobBorough === normalizedName
        })
    }

    const groupPlaces = locationGroups[selectedLocation]

    if (groupPlaces) {
        if (selectedBorough) {
            const exactMatch = jobTown === selectedBorough || jobBorough === selectedBorough

            if (exactMatch) {
                return true
            }
        }

        return groupPlaces.some(place => {
            const normalizedPlace = normalizeLocation(place)
            return jobTown === normalizedPlace || jobBorough === normalizedPlace
        })
    }

    if (selectedBorough) {
        return jobTown === selectedBorough || jobBorough === selectedBorough
    }

    return jobTown === selectedLocation || jobBorough === selectedLocation
}

function filterJobsByLocation(jobs, location, borough) {
    return jobs.filter(job => locationMatchesJob(job, location, borough))
}

function buildLocationRefinements(location, jobs) {
    const selectedLocation = normalizeLocation(location)
    const groupPlaces = selectedLocation === 'london'
        ? londonBoroughNames
        : locationGroups[selectedLocation]

    if (!groupPlaces) {
        return []
    }

    return groupPlaces.map(name => {
        const count = jobs.filter(job => {
            const jobTown = normalizeLocation(job.organisation && job.organisation.address && job.organisation.address.town)
            const jobBorough = normalizeLocation(job.borough)
            const normalizedName = normalizeLocation(name)
            return jobTown === normalizedName || jobBorough === normalizedName
        }).length

        return {
            name,
            count
        }
    })
}

function redirectToCleanLocationQuery(req, res, location, borough) {
    const params = new URLSearchParams(req.query)
    let shouldRedirect = false

    if (req.query.location !== undefined && sanitizeLocationValue(req.query.location) !== req.query.location) {
        shouldRedirect = true
    }

    if (req.query.borough !== undefined && sanitizeLocationValue(req.query.borough) !== req.query.borough) {
        shouldRedirect = true
    }

    if (!shouldRedirect) {
        return false
    }

    if (location) {
        params.set('location', location)
    } else {
        params.delete('location')
    }

    if (borough) {
        params.set('borough', borough)
    } else {
        params.delete('borough')
    }

    res.redirect(req.path + '?' + params.toString())
    return true
}

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
        const hasLocationQuery = req.query.location !== undefined
        const location = sanitizeLocationValue(hasLocationQuery ? req.query.location : req.session.data.location)
        const borough = sanitizeLocationValue(
            req.query.borough !== undefined
                ? req.query.borough
                : (hasLocationQuery ? '' : req.session.data.borough)
        )

        if (redirectToCleanLocationQuery(req, res, location, borough)) {
            return
        }

        req.session.data.location = location
        req.session.data.borough = borough

        const visibleJobs = filterJobsByLocation(jobs, location, borough)

        res.render('jobs/search/filter', {
            jobs: visibleJobs,
            allJobs: jobs,
            londonBoroughs: buildLondonBoroughs(jobs, req.query),
            locationRefinements: buildLocationRefinements(location, jobs),
            isLondonSearch: isLondonSearch(location),
            query: req.query
        })
    })

    router.get('/search/fe', (req, res) => {
        let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
        const hasLocationQuery = req.query.location !== undefined
        const location = sanitizeLocationValue(hasLocationQuery ? req.query.location : req.session.data.location)
        const borough = sanitizeLocationValue(
            req.query.borough !== undefined
                ? req.query.borough
                : (hasLocationQuery ? '' : req.session.data.borough)
        )

        if (redirectToCleanLocationQuery(req, res, location, borough)) {
            return
        }

        req.session.data.location = location
        req.session.data.borough = borough

        const visibleJobs = filterJobsByLocation(jobs, location, borough)

        res.render('jobs/search/filterfe', {
            jobs: visibleJobs,
            allJobs: jobs,
            londonBoroughs: buildLondonBoroughs(jobs, req.query),
            locationRefinements: buildLocationRefinements(location, jobs),
            isLondonSearch: isLondonSearch(location),
            query: req.query
        })
    })

    //only use home search to pre-select filters

    router.get('/search/home', (req, res) => {
        let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
        const hasLocationQuery = req.query.location !== undefined
        const location = sanitizeLocationValue(hasLocationQuery ? req.query.location : req.session.data.location)
        const borough = sanitizeLocationValue(
            req.query.borough !== undefined
                ? req.query.borough
                : (hasLocationQuery ? '' : req.session.data.borough)
        )

        if (redirectToCleanLocationQuery(req, res, location, borough)) {
            return
        }

        req.session.data.location = location
        req.session.data.borough = borough

        const visibleJobs = filterJobsByLocation(jobs, location, borough)

        res.render('jobs/search/filter', {
            jobs: visibleJobs,
            allJobs: jobs,
            londonBoroughs: buildLondonBoroughs(jobs, req.query),
            locationRefinements: buildLocationRefinements(location, jobs),
            isLondonSearch: isLondonSearch(location),
            query: req.query
        })
    })

    router.get('/clear-filters', (req, res) => {
       
        req.session.data['filter-role'] = '';
        req.session.data['filter-phase'] = '';
        req.session.data['filter-subject'] = '';
        req.session.data['filter-suitability'] = '';
        req.session.data['filter-workingPatterns'] = '';
        req.session.data['filter-keyStages'] = '';
        req.session.data['keywords'] = '';
        req.session.data['location'] = '';

        res.redirect('/jobs')
    })

}
