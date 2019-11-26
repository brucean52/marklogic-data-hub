import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { Layout, Tooltip } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AuthContext } from '../util/auth-context';
import { SearchContext } from '../util/search-context';
import AsyncLoader from '../components/async-loader/async-loader';
import Sidebar from '../components/sidebar/sidebar';
import SearchBar from '../components/search-bar/search-bar';
import SearchPagination from '../components/search-pagination/search-pagination';
import SearchSummary from '../components/search-summary/search-summary';
import SearchResults from '../components/search-results/search-results';
import ResultTable from '../components/result-table/result-table';
import { entityFromJSON, entityParser } from '../util/data-conversion';
import styles from './Browse.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStream, faTable } from '@fortawesome/free-solid-svg-icons'


interface Props extends RouteComponentProps<any> {
}

const Browse: React.FC<Props> = ({ location }) => {

  const { Content, Sider } = Layout;
  const componentIsMounted = useRef(true);
  const { user, handleError, setTableView } = useContext(AuthContext);
  const {
    searchOptions,
    setEntityClearQuery,
    setLatestJobFacet,
  } = useContext(SearchContext);

  const [data, setData] = useState();
  const [entities, setEntites] = useState<any[]>([]);
  const [entityDefArray, setEntityDefArray] = useState<any[]>([]);
  const [facets, setFacets] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [active, setIsActive] = useState(user.tableView);
  const [snippetActive, setIsSnippetActive] = useState(!user.tableView);

  const getEntityModel = async () => {
    try {
      const response = await axios(`/datahub/v2/models`);
      if (componentIsMounted.current) {
        const parsedModelData = entityFromJSON(response.data);
        let entityArray = [...entityFromJSON(response.data).map(entity => entity.info.title)];
        setEntites(entityArray);
        setEntityDefArray(entityParser(parsedModelData));
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const getSearchResults = async (allEntities: string[]) => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: 'POST',
        url: `/datahub/v2/search`,
        data: {
          query: searchOptions.query,
          entityNames: searchOptions.entityNames.length ? searchOptions.entityNames : allEntities,
          start: searchOptions.start,
          pageLength: searchOptions.pageLength,
          facets: searchOptions.searchFacets,
        }
      });
      if (componentIsMounted.current) {
        setData(response.data.results);
        setFacets(response.data.facets);
        setTotalDocuments(response.data.total);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (location.state && location.state.entity) {
      setEntityClearQuery(location.state.entity);
    }
    if (location.state && location.state.jobId) {
      setLatestJobFacet(location.state.jobId, location.state.entityName);
    }
    if (!user.error.type) {
      getEntityModel();
    }

    return () => {
      componentIsMounted.current = false
    }

  }, []);

  useEffect(() => {
    if (entities.length && !user.error.type) {
      getSearchResults(entities);
    }
  }, [searchOptions, entities, user.error.type]);


  const tableSwitch = () => {
    setIsActive(true);
    setIsSnippetActive(false);
    setTableView(true)
  };

  const snippetSwitch = () => {
    setIsActive(false);
    setIsSnippetActive(true);
    setTableView(false)
  };

  return (
    <>
      <Layout>
        <Sider className={styles.sideBarFacets} width={300}>
          <Sidebar
            facets={facets}
            selectedEntities={searchOptions.entityNames}
            entityDefArray={entityDefArray}
          />
        </Sider>
        <Content className={styles.content}>
          {isLoading || user.error.type === 'ALERT' ?
            <AsyncLoader />
            :
            <>
              <div className={styles.searchBar}>
                <SearchBar entities={entities} />
                <SearchSummary
                  total={totalDocuments}
                  start={searchOptions.start}
                  length={searchOptions.pageLength}
                  pageSize={searchOptions.pageSize}
                />
                <SearchPagination
                  total={totalDocuments}
                  pageNumber={searchOptions.pageNumber}
                  pageSize={searchOptions.pageSize}
                />
                <br />
                <br />
                <div style={{ marginRight: '12px' }}>
                  <div className={active ? styles.toggled : styles.toggleView}
                    data-cy="table-view"
                    onClick={() => tableSwitch()}>
                    <Tooltip title={'Table View'}><FontAwesomeIcon icon={faTable} size="lg" /></Tooltip>
                  </div>
                  <div className={snippetActive ? styles.toggled : styles.toggleView}
                    data-cy="facet-view"
                    onClick={() => snippetSwitch()}>
                    <Tooltip title={'Snippet View'}><FontAwesomeIcon icon={faStream} size="lg" /></Tooltip>
                  </div>
                </div>
              </div>
              {user.tableView ?
                <div style={{ marginTop: '150px' }}><ResultTable data={data} entity={searchOptions.entityNames}
                  entityDefArray={entityDefArray} />
                </div>
                : <SearchResults data={data} entityDefArray={entityDefArray} />
              }
              <br />
              <div>
                <SearchSummary
                  total={totalDocuments}
                  start={searchOptions.start}
                  length={searchOptions.pageLength}
                  pageSize={searchOptions.pageSize}
                />
                <SearchPagination
                  total={totalDocuments}
                  pageNumber={searchOptions.pageNumber}
                  pageSize={searchOptions.pageSize}
                />
              </div>
            </>
          }
        </Content>
      </Layout>
    </>
  );
}

export default withRouter(Browse);