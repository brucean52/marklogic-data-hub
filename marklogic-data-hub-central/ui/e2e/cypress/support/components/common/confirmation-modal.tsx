import { ConfirmationType } from '../../types/modeling-types';

class ConfirmationModal {
  getNoButton(type: ConfirmationType) {
    return cy.findByLabelText(`confirm-${type}-no`);
  }
  getCloseButton(type: ConfirmationType) {
    return cy.findByLabelText(`confirm-${type}-close`);
  }
  getYesButton(type: ConfirmationType) {
    return cy.findByLabelText(`confirm-${type}-yes`);
  }
  getToggleStepsButton() {
    return cy.findByLabelText('toggle-steps');
  }
  getSaveEntityText() {
    return cy.findByLabelText('save-text');
  }
  getSaveAllEntityText() {
    return cy.findByLabelText('save-all-text');
  }

  getRevertEntityText() {
    return cy.findByLabelText('revert-text');
  }

  getRevertAllEntityText() {
    return cy.findByLabelText('revert-all-text');
  }
  getDeleteEntityText() {
    return cy.findByLabelText('delete-text');
  }
  getDeleteEntityRelationshipText() {
    return cy.findByLabelText('delete-relationship-text');
  }

  getDeleteEntityRelationshipEditText() {
    return cy.findByLabelText('delete-relationship-edit-text');
  }

  getDeleteEntityNoRelationshipEditText() {
    return cy.findByLabelText('delete-no-relationship-edit-text');
  }

  getDeleteEntityStepText() {
    return cy.findByLabelText('delete-step-text');
  }
  getDeletePropertyWarnText() {
    return cy.findByLabelText('delete-property-text');
  }
  getDeletePropertyStepWarnText() {
    return cy.findByLabelText('delete-property-step-text');
  }
  getNavigationWarnText() {
    return cy.findByLabelText('navigation-warn-text');
  }
}

const confirmationModal = new ConfirmationModal();

export default confirmationModal