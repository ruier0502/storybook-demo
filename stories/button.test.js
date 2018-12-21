// import { specs, describe, it } from 'storybook-addon-specifications'
import React from 'react';
// import {mount} from "enzyme";
// import expect from "expect";
// import {Button} from 'antd';
const React = require('react');
const renderer = require('react-test-renderer');
require('jest');

module.exports = 
    describe('Hello World', function () {
        test('two plus two is four', () => {
            expect(2 + 2).toBe(4);
        });
    }
)