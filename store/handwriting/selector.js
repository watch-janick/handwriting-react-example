import { createSelector } from 'reselect'

const choicesSelector = state => state.handwriting.choices
const selectedIdSelector = state => state.handwriting.selectedId
const imageSelector = state => state.handwriting.image

/**
 * Retrieve the choice based on its ID
 * @return {object} An object representing a handwriting style
 */
export const selectedChoice = createSelector(
  choicesSelector,
  selectedIdSelector,
  (choices, selectedId) => choices.find(choice => choice.id === selectedId)
)