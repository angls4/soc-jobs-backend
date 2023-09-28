const express = require('express');
const { Router } = require('express');
const router = Router();
const jobController = require('../controllers/jobController');

// Route to get all jobs listed
router.get('/', jobController.getAllJobs);

// Route to get a job by ID
router.get('/:id', jobController.getJobById);

// Route to create a new job
router.post('/', jobController.createJob);

// Route to update a job by ID
router.put('/:id', jobController.updateJob);

// Route to delete a job by ID
router.delete('/:id', jobController.deleteJob);

module.exports = router;
