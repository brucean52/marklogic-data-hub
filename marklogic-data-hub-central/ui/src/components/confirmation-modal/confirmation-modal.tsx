import React, { useState, useEffect } from 'react';
import { Modal, Icon } from 'antd';
import { MLAlert, MLButton } from '@marklogic/design-system';
import styles from './confirmation-modal.module.scss'

import { ConfirmationType } from '../../types/modeling-types';

type Props = {
  isVisible: boolean;
  type: ConfirmationType;
  boldTextArray: string[];
  arrayValues?: string[];
  toggleModal: (isVisible: boolean) => void;
  confirmAction: () => void;
};

const ConfirmationModal: React.FC<Props> = (props) => {
  const [title, setTitle] = useState('Confirmation');
  const [showSteps, toggleSteps] = useState(false);
  const [loading, toggleLoading] = useState(false);

  useEffect(() => {
    if (props.isVisible) {
      let title = 'Confirmation';
      if (props.type === ConfirmationType.DeleteEntityStepWarn) {
        title = 'Delete: Entity Type in Use'
      }

      setTitle(title);
      toggleSteps(false);
      toggleLoading(false);
    }
  }, [props.isVisible]);

  const closeModal = () => {
    if (!loading) {
      props.toggleModal(false)
    }
  }

  const renderArrayValues = props.arrayValues?.map((item, index) => <li key={item + index}>{item}</li>);

  const modalFooter = <div className={styles.modalFooter}>
    <MLButton
      aria-label={`confirm-${props.type}-no`}
      size="default"
      onClick={closeModal}
    >No</MLButton>
    <MLButton
      aria-label={`confirm-${props.type}-yes`}
      type="primary"
      size="default"
      loading={loading}
      onClick={() => {
        toggleLoading(true);
        props.confirmAction();
      }}
    >Yes</MLButton>
  </div>

  const modalFooterClose = <MLButton
    aria-label={`confirm-${props.type}-close`}
    type="primary"
    size="default"
    onClick={closeModal}
  >Close</MLButton>

  return (
    <Modal
      visible={props.isVisible}
      destroyOnClose={true}
      closable={true}
      title={title}
      onCancel={closeModal}
      maskClosable={false}
      footer={props.type === ConfirmationType.DeleteEntityStepWarn ? modalFooterClose : modalFooter}
    >
      {props.type === ConfirmationType.Identifer && (
        <>
          <p id="identifier-text">Each entity type is allowed a maximum of one identifier. The current identifier is <b>{props.boldTextArray[0]}</b>.
          Choosing a different identifier could affect custom applications and other code that uses <b>{props.boldTextArray[0]}</b> for searching.</p>

          <p>Are you sure you want to change the identifier from <b>{props.boldTextArray[0]}</b> to <b>{props.boldTextArray[1]}</b>?</p>
        </>
      )}

      {props.type === ConfirmationType.DeleteEntity && <span id="delete-text">Permanently delete <b>{props.boldTextArray[0]}</b>?</span>}

      {props.type === ConfirmationType.DeleteEntityRelationshipWarn && (
        <>
          <MLAlert
            className={styles.alert}
            closable={false}
            description={"Existing entity type relationships."}
            showIcon
            type="warning"
          />
          <p id="delete-relationship-text">The <b>{props.boldTextArray[0]}</b> entity type is related to one or more entity types. Deleting <b>{props.boldTextArray[0]}</b> will cause
          those relationships to be removed from all involved entity types.</p>
          <p>Are you sure you want to delete the <b>{props.boldTextArray[0]}</b> entity type?</p>
        </>
      )}

      {props.type === ConfirmationType.DeleteEntityRelationshipOutstandingEditWarn && (
        <>
          <MLAlert
            className={styles.alert}
            closable={false}
            description={"There are existing entity type relationships, and outstanding edits that need to be saved."}
            showIcon
            type="warning"
          />
          <p id="delete-relationship-edit-text">The <b>{props.boldTextArray[0]}</b> entity type is related to one or
            more entity types. Deleting <b>{props.boldTextArray[0]}</b> will cause
            those relationships to be removed from all involved entity types.</p>
          <p>Also, before you can delete the <b>{props.boldTextArray[0]}</b> entity type, all changes to other entity
            types must be saved first, in order to make changes to the whole entity model. This may include updating
            indexes. Changes to the following entity types will be saved if you continue:</p>
          <ul className={styles.stepList}>
            {renderArrayValues}
          </ul>
          <p>OK to save these entity type changes before proceeding with deleting <b>{props.boldTextArray[0]}</b>?</p>
        </>
      )}

      {props.type === ConfirmationType.DeleteEntityStepWarn && (
        <>
          <MLAlert
            className={styles.alert}
            closable={false}
            description={"Entity type is used in one or more steps."}
            showIcon
            type="warning"
          />
          <p id="delete-step-text">Edit these steps and choose a different entity type before deleting <b>{props.boldTextArray[0]}</b>, to correlate with your changes to this property.</p>
          <p
            aria-label="toggle-steps"
            className={styles.toggleSteps}
            onClick={() => toggleSteps(!showSteps)}
          >{showSteps ? 'Hide Steps...' : 'Show Steps...'}</p>

          {showSteps && (
            <ul className={styles.stepList}>
              {renderArrayValues}
            </ul>
          )}
        </>
      )}

      {props.type === ConfirmationType.DeletePropertyWarn && 
        <span 
          id="delete-property-text"
          aria-label="delete-property-text"
        >Are you sure you want to delete the <b>{props.boldTextArray[0]}</b> property?</span>
      }

      {props.type === ConfirmationType.DeletePropertyStepWarn && (
        <>
          <MLAlert
            className={styles.alert}
            closable={false}
            description={"Delete may affect some steps."}
            showIcon
            type="warning"
          />
          <p id="delete-property-step-text" aria-label="delete-property-step-text">The <b>{props.boldTextArray[1]}</b> entity type is used in one or more steps,
          so deleting this property may require editing the steps to make sure this deletion doesn't affect those steps.</p>
          <p
            aria-label="toggle-steps"
            className={styles.toggleSteps}
            onClick={() => toggleSteps(!showSteps)}
          >{showSteps ? 'Hide Steps...' : 'Show Steps...'}</p>

          {showSteps && (
            <ul className={styles.stepList}>
              {renderArrayValues}
            </ul>
          )}
          <p>Are you sure you want to delete the <b>{props.boldTextArray[0]}</b> property?</p>
        </>
      )}

      {props.type === ConfirmationType.SaveEntity && (
        <>
          <p id="save-text">Are you sure you want to save changes to <b>{props.boldTextArray[0]}</b>?</p>

          <p>Changes will be saved to the entity model, possibly including updating indexes.
            Any features enabled by the changes will not be available until this is complete.
          </p>
        </>
      )}

      {props.type === ConfirmationType.SaveAll && (
        <>
          <p id="save-all-text">Are you sure you want to save ALL changes to ALL entity types?</p>

          <p>Changes will be saved to the entity model, possibly including updating indexes.
            Any features enabled by the changes will not be available until this is complete.
          </p>
        </>
      )}

      {props.type === ConfirmationType.RevertEntity && (
        <>
          <p id="revert-text">Are you sure you want to discard your changes to <b>{props.boldTextArray[0]}</b>?</p>

          <p>The settings from the last saved version of all properties will be restored.</p>
        </>
      )}

      {props.type === ConfirmationType.RevertAll && (
        <>
          <p id="revert-all-text">Are you sure you want to discard all changes to all entity types?</p>

          <p>The settings from the last saved version of all properties of all
            entity types will be restored.
          </p>
        </>
      )}
    </Modal>
  )
}

export default ConfirmationModal;