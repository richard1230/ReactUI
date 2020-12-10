import * as renderer from 'react-test-renderer'
import React from 'react'
import Icon from '../icon'
import {mount} from 'enzyme'

describe('icon',()=>{
    it('should render successful', () =>{
        const  json = renderer.create(<Icon name="alipay"/>).toJSON()
        expect(json).toMatchSnapshot()
    });

    it('onClick',  ()=> {

    });
})
