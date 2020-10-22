import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateEditStepDialog from './create-edit-step-dialog';
import { StepType } from '../../../types/curation-types';
import userEvent from "@testing-library/user-event";

describe('Create/Edit Step Artifact component', () => {

  test('can create a new merging step', () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <CreateEditStepDialog
        isVisible={true}
        isEditing={false}
        stepType={StepType.Merging}
        editStepArtifactObject={{}}
        targetEntityType={'Order'}
        canReadWrite={true}
        canReadOnly={true}
        toggleModal={jest.fn()}
        createStepArtifact={jest.fn()}
      />
    );
    expect(getByText('New Merging Step')).toBeInTheDocument();
    
      
  });
});
