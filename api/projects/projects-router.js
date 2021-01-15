// Write your "projects" router here!

const express = require('express');
const Project = require('./projects-model');

const router = express.Router();
const { checkProjectId, checkProjectBody } = require('../middleware/index');


/*

  - `[GET] /api/projects` sends an array of projects (or an empty array) as the body of the response.
  - `[GET] /api/projects/:id` sends a project with the given `id` as the body of the _response_.
  - `[POST] /api/projects` sends the newly created project as the body of the _response_.
  - `[PUT] /api/projects/:id` sends the updated project as the body of the _response_.
  - `[DELETE] /api/projects/:id` sends no _response_ body.

*/

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "Internal server error" })
        })
});

router.get('/:id', checkProjectId, async (req, res) => {
    if (req.project){
        res.status(200).json(req.project)
    } else {
        res.status(500).json({ errorMessage: "Internal server error" })
    }
});

router.post('/', checkProjectBody, async (req, res) => {
    try {
        const newProjet = await Project.insert(req.body)
        res.status(201).json(newProjet)
    } catch (err) {
        res.status(500).json({ errorMessage: "Internal server error" })
    }
});

router.put('/:id', checkProjectId, checkProjectBody, async (req, res) => {
    try {
        const updatedProject = await Project.update(req.params.id, req.body);
        res.status(200).json(updatedProject)
    } catch (err) {
        res.status(500).json({ errorMessage: "Internal server error" })
    }
})

router.delete('/:id', checkProjectId, async (req, res) => {
    try {
        const deletedAction = await Project.remove(req.params.id);
        res.status(200).json(deletedAction)
    } catch (err) {
        res.status(500).json({ errorMessage: "Internal server error" })
    }
})

router.get('/:id/actions', checkProjectId, async (req, res) => {
    try {
        const projectActions = await Project.getProjectActions(req.params.id);
        res.status(200).json(projectActions);
    } catch (err){
        res.status(500).json({ errorMessage: "Internal server error" })
    }
})

module.exports = router;