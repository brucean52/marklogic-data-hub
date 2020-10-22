import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

import MergingCard from './merging-card';

import { matchingStep } from '../../../assets/mock-data/curation/matching';
import { customerEntityDef} from '../../../assets/mock-data/curation/entity-definitions-mock';

const mergingStepsArray = matchingStep.artifacts;


describe('Matching cards view component', () => {
  it('can render matching steps', () => {
    const { getByText } =  render(
      <Router>
        <MergingCard
          mergingStepsArray={mergingStepsArray}
          flows={[]}
          entityName={customerEntityDef.info.title}
          deleteMergingArtifact={jest.fn()}
          createMergingArtifact={jest.fn()}
          canReadMatchMerge={true}
          canWriteMatchMerge={true}
          entityModel={customerEntityDef.definitions}
          addStepToFlow={jest.fn()}
          addStepToNew={jest.fn()}
        />
      </Router>
    );

    expect(getByText('matchCustomers')).toBeInTheDocument();
    expect(getByText('matchCustomersEmpty')).toBeInTheDocument();
  });
});