const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile');
const server = express();
const db = knex(dbConfig.development);
const PORT = 4500;

server.use(express.json());

//beginning of /api/cohorts endpoints

// - `[POST] /api/cohorts` This route should save a new cohort to the database.
server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db('cohorts').insert(cohort)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to insert cohort' });
        });
});

// - `[GET] /api/cohorts` This route will return an array of all cohorts.
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(rows => {
            res.status(200).json(rows);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to find cohorts' });
        });
});

// - `[GET] /api/cohorts/:id` This route will return the cohort with the matching `id`.
server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts').where('id', id)
        .then(rows => {
            res.status(200).json(rows);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to find cohort with that id.' });
        });
});

// - `[GET] /api/cohorts/:id/students` returns all students for the cohort with the specified `id`.
server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params;
    db('students').where('cohort_id', id)
        .then(rows => {
            res.json(rows)
        })
        .catch(er => {
            res.status(500).json({ errorMessage: 'Failed to find student from that cohort' });
        });
});

// - `[PUT] /api/cohorts/:id` This route will update the cohort with the matching `id` using information sent in the body of the request.
server.put('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    const cohort = req.body;
    db('cohorts').where('id', id).update(cohort)
        .then(rowCount => {
            res.json(rowCount);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to update cohort.' });
        });
});

// - `[DELETE] /api/cohorts/:id` This route should delete the specified cohort.
server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts').where('id', id).del()
        .then(rowCount => {
            res.json(rowCount);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to delete cohort.' });
        });
});

//end of /api/cohorts endpoints

//beginning of /api/students endpoints

// - `[POST] /students` This route should save a new student to the database.
server.post('/students', (req, res) => {
    const student = req.body;
    db('students').insert(student)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to insert student' });
        });
});

// - `[GET] /students` This route will return an array of all students.
server.get('/students', (req, res) => {
    db('students')
        .then(rows => {
            res.status(200).json(rows);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to find students' });
        });
});

// - `[GET] /students/:id` This route will return the student with the matching `id`.
server.get('/students/:id', (req, res) => {
    const { id } = req.params;
    db('students').where('id', id)
        .then(rows => {
            res.status(200).json(rows);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to find student with that id.' });
        });
});

// - `[PUT] /students/:id` This route will update the student with the matching `id` using information sent in the body of the request.
server.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const student = req.body;
    db('students').where('id', id).update(student)
        .then(rowCount => {
            res.json(rowCount);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to update student.' });
        });
});

// - `[DELETE] /students/:id` This route should delete the specified student.
server.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    db('students').where('id', id).del()
        .then(rowCount => {
            res.json(rowCount);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to delete student.' });
        });
});

//end of /api/students enpoints
server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})