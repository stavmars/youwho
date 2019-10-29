import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { Button } from 'semantic-ui-react';

// tslint:disable:jsx-no-lambda

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <img src="/content/images/giagia.png" style={{ minWidth: '589px', maxHeight: '821px' }} />
        <div>
          <p
            style={{
              width: '618px',
              height: '379px',
              marginTop: '112px',
              fontFamily: 'TTNormsProItalic',
              fontSize: '48px',
              background: '#777EFF 0% 0% no-repeat padding-box',
              color: '#FFFFFF',
              borderRadius: '230px 151px 200px 0'
            }}
          >
            <div style={{ padding: '50px 0 0 100px' }}>Εσύ πόσο</div>
            <p
              style={{
                fontSize: '98px',
                fontFamily: 'TTNormsProBoldItalic',
                color: '#FFFFFF',
                textAlign: 'center',
                marginBottom: '0'
              }}
            >
              YouWho
            </p>
            <span style={{ float: 'right', marginRight: '100px' }}>είσαι;</span>
          </p>
          <Button
            as={NavLink}
            to="survey-chat/youWho"
            style={{
              width: '334px',
              height: '149px',
              fontFamily: 'TTNormsProBoldItalic',
              fontSize: '31px',
              color: '#FFFFFF',
              background: '#FF6666 0% 0% no-repeat padding-box',
              float: 'right',
              borderRadius: '200px 151px 0 200px',
              textAlign: 'center'
            }}
          >
            Κάνε την έρευνα
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
