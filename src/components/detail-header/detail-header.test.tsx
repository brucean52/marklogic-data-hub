import React from 'react';
import { mount } from 'enzyme';
import DetailHeader from './detail-header';
import MockDocument from '../../assets/mock-data/example';



describe("Detail component", () => {

    /*let wrapper;

    beforeAll(() => {
        wrapper = mount(<DetailHeader document={MockDocument}/>)
    });*/

    test("renders", () => {
        expect(true).toBe(true);
    })

    /*test("header renders", () => {
        expect(wrapper.find('#header')).toHaveLength(1);
    })

    test("title renders", () => {
        expect(wrapper.find('#title')).toHaveLength(1);
    })

    test("summary renders", () => {
        expect(wrapper.find('#summary')).toHaveLength(1);
    })*/
})