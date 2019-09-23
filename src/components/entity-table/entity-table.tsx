import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import styles from './entity-table.module.scss';
import { Table } from 'antd';

type Props = {
  entities: any[];
  facetValues: any[];
}

const EntityTable:React.FC<Props> = (props) => {

  const expandedRowRender = (entity) => {
    const columns = [
      { title: 'Property', dataIndex: 'property', width: 200 },
      { title: 'Data Type', dataIndex: 'datatype', width: 200 },
      { title: 'Index Settings', dataIndex: 'indexSettings' }
    ];

    let properties = entity.definition.properties.map(property => {
      let indexes: string[] = [];
      if (entity.definition.hasOwnProperty('primaryKey') && entity.definition.primaryKey.includes(property.name)){
        indexes.push('Primary Key');
      }
      if (entity.definition.elementRangeIndex.includes(property.name)){
        indexes.push('Element Range Index');
      }
      if (entity.definition.pii.includes(property.name)){
        indexes.push('pii');
      }
      if (entity.definition.rangeIndex.includes(property.name)){
        indexes.push('Range Index');
      }
      if (entity.definition.required.includes(property.name)){
        indexes.push('Required');
      }
      if (entity.definition.wordLexicon.includes(property.name)){
        indexes.push('Word Lexicon');
      }
      if(indexes.length === 0) {
        indexes.push('None');
      }
      let data = {
        property: property.name,
        datatype: property.datatype,
        indexSettings: indexes.join(', ')
      }
      return data
    });

    return <Table 
              rowKey="property"
              className="property-table"
              columns={columns} 
              dataSource={properties} 
              pagination={false} 
            />;
  };


  const columns = [
    { 
      title: 'Entity Name', 
      dataIndex: 'name', 
      width: 200,
      render: text => { return (
        <Link to={{
          pathname: "/browse", 
          state: { entity: text} }}
        >
          {text}
        </Link>
      )},  
      sorter: (a, b) => { return a.name.localeCompare(b.name) }
    },
    { 
      title: 'Documents', 
      dataIndex: 'documents', 
      width: 200 ,
      sorter: (a, b) => { return a.documents - b.documents }
    },
    { 
      title: 'Last Harmonized', 
      dataIndex: 'created',
      sorter: (a, b) => { return a.created.localeCompare(b.created) }
    }
  ];
  
  const realData = props.entities.map((entity, index) => {
    const entityDefinition = entity.definitions.find(definition => definition.name === entity.info.title);
    // TODO add created date
    let documentCount = 0;

    if (props.facetValues.length) {
      // const name = entity.info.title.toLowerCase();
      const collectionObject = props.facetValues.find(collection => collection.name === entity.info.title);
      if (collectionObject) {
        documentCount = collectionObject.count;
      }
    }

    let parsedEntity = {
      name: entity.info.title,
      documents: documentCount, 
      created: '2019-07-30T16:08:30',
      definition: entityDefinition
    }
    return parsedEntity
  });

  return (
    <Table
      rowKey="name"
      className="entity-table"
      columns={columns}
      expandedRowRender={expandedRowRender}
      dataSource={realData}
    />
  );
}

export default EntityTable;