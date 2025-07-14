import expres from 'express'
import { getOnboarding, createOnboarding, updateOnboarding, deleteOnboarding } from '../controllers/controllers.js'


const router =expres.Router()

router.get('/', getOnboarding)
router.get('/:id', getOnboarding)
router.post('/', createOnboarding)
router.delete('/:id', deleteOnboarding)
router.put('/:id', updateOnboarding)

export default router