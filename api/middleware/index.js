const Action = require('../actions/actions-model');
const Project = require('../projects/projects-model');

async function checkActionId(req, res, next){
    try {
        const action = await Action.get(req.params.id);
        if (action){
            req.action = action;
            next();
        } else {
            res.status(404).json({ errorMessage: `action with id ${req.params.id} not found`})
        }
    } catch (error){
        res.status(500).json({ errorMessage: "There was an error" })
    }
}
function checkActionBody(req, res, next){
    const newAction = req.body;
    if (newAction.project_id && newAction.description && newAction.notes){
        next();
    } else {
        res.status(400).json({ errorMessage: "Project_id, Description, and Notes are all required to submit an Action. Project_id must be a valid project_id" })
    }
}

async function checkProjectId(req, res, next){
    try {
        const project = await Project.get(req.params.id);
        if (project){
            req.project = project;
            next();
        } else {
            res.status(404).json({ errorMessage: `project with id ${req.params.id} not found` })
        }
    } catch (err) {
        res.status(500).json({ errorMessage: "There was an error" })
    }
}

function checkProjectBody(req, res, next){
    const newProject = req.body;
    if (newProject.name && newProject.description){
        next();
    } else {
        res.status(400).json({ errorMessage: "Name and Description are required to submit a Project." })
    }
}

module.exports = {
    checkActionId,
    checkActionBody,
    checkProjectId,
    checkProjectBody
}