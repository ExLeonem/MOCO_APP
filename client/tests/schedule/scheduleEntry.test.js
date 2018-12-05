import React from 'react';
import Entry from '../../components/schedule/entry';
import renderer from 'react-test-renderer';


test('Test ', () => {
    const component = renderer.create(
        <Entry 
            time={"18:00"}
            date={"12.12.2018"}
            type={"week"}
            repeat={}
            isActive={true}
            uuid={1}
        />
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});