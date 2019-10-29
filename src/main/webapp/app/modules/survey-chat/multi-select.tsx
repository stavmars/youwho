import React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';
import { IComponentProps } from 'app/modules/survey-chat/configure-steps';
import { IRootState } from 'app/shared/reducers';
import { addQuestionResponse, initiateQuestionTimer } from 'app/modules/survey-chat/chatbot.reducer';
import { connect } from 'react-redux';
import moment from 'moment';
// tslint:disable:jsx-no-lambda

export interface IMultiSelectProps extends IComponentProps, StateProps, DispatchProps {
  questionId: string;
}

export interface IMultiSelectState {
  boxesChecked: number;
  optChecked: boolean[];
}

export class MultiSelect extends React.Component<IMultiSelectProps, IMultiSelectState> {
  constructor(props) {
    super(props);
    this.state = {
      boxesChecked: 0,
      optChecked: []
    };
  }

  componentDidMount() {
    this.setState({ optChecked: new Array(this.props.options.length).fill(false) });
    this.props.initiateQuestionTimer();
  }

  checkBox = index => {
    this.setState({
      boxesChecked: this.state.optChecked[index] ? this.state.boxesChecked - 1 : this.state.boxesChecked + 1,
      optChecked: this.state.optChecked.splice(index, 1, !this.state.optChecked[index]) && this.state.optChecked
    });
  };

  submitChoices = () => {
    const answers = this.props.options
      .map((option, index) => {
        if (this.state.optChecked[index]) return option;
      })
      .filter(el => el);
    this.props.addQuestionResponse({
      questionId: this.props.questionId,
      startTime: this.props.questionStartTime,
      endTime: moment(),
      choiceIds: answers.map(answer => answer.value)
    });
    // @ts-ignore
    this.props.triggerNextStep({ value: answers, trigger: 'res_' + this.props.questionId });
  };

  render() {
    const { options } = this.props;
    const lastIndex = options.length - 1;

    return (
      <div style={{ width: '100%', height: '100%', marginBottom: '10px' }}>
        <h2 style={{ fontFamily: 'TTNormsProMedium', fontSize: '10px', color: '#FFFFFF', textAlign: 'center' }}>
          ΕΠΙΛΈΞΤΕ ΈΩΣ ΔΎΟ ΑΠΑΝΤΉΣΕΙΣ
        </h2>
        <Form>
          {options.map((option, index) => (
            <Checkbox
              key={index}
              className="check-box"
              label={option.text}
              onChange={() => this.checkBox(index)}
              checked={this.state.optChecked[index]}
              disabled={
                (!this.state.optChecked[index] && this.state.boxesChecked === 2) ||
                (this.state.optChecked[lastIndex] && index !== lastIndex) ||
                (index === lastIndex && this.state.boxesChecked && !this.state.optChecked[lastIndex])
              }
              style={{
                fontFamily: 'TTNormsProMedium',
                fontSize: '15px',
                color: '#777EFF',
                opacity: this.state.optChecked[index] ? 1 : 0.7
              }}
            />
          ))}
          <Form.Button
            className="submit"
            type="submit"
            disabled={!this.state.boxesChecked}
            onClick={this.submitChoices}
            style={{
              fontFamily: 'TTNormsProMedium',
              fontSize: '15px',
              color: '#777EFF',
              textAlign: 'center',
              borderRadius: '21px',
              background: '#ffffff 0% 0% no-repeat padding-box',
              opacity: 1,
              marginLeft: '50%'
            }}
          >
            υποβολή
          </Form.Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  questionStartTime: storeState.chatBot.questionStartTime
});

const mapDispatchToProps = {
  initiateQuestionTimer,
  addQuestionResponse
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiSelect);
