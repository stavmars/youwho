import React from 'react';
import SliderInput from 'app/modules/chatbot/slider-input';
import Answer from 'app/modules/chatbot/answer';
import Interest from 'app/modules/chatbot/interest';
import SingleSelect from 'app/modules/chatbot/single-select';
import MultiSelect from 'app/modules/chatbot/multi-select';
import MultiAnswer from 'app/modules/chatbot/multi-answer';
// tslint:disable:jsx-no-lambda

export interface IComponentProps {
  options: any;
  style: React.CSSProperties;
}

export interface IAnswer {
  id: string;
  text: string;
  questionId: string;
}

export const configureStep = questions => {
  const steps = [];

  for (let index = 0; index < questions.length; index++) {
    const question = questions[index];
    // Creating a step for each question.
    if (question.imageURL) {
      steps.push({
        id: question.id,
        message: question.text,
        trigger: 'image_' + question.id,
        delay: 1500
      });
      steps.push({
        id: 'image_' + question.id,
        component: (
          <div style={{ width: '100%' }}>
            <img src={question.imageURL} alt="message" className="images" />
          </div>
        ),
        trigger: question.id === 'last_question' ? null : question.responseChoices ? 'option_' + question.id : questions[index + 1].id
      });
    } else if (question.type !== 'info_text') {
      steps.push({
        id: question.id,
        component: <span style={{ fontFamily: 'TTNormsProBold' }}>{question.text}</span>,
        trigger: question.id === 'last_question' ? null : question.responseChoices ? 'option_' + question.id : questions[index + 1].id,
        asMessage: true,
        delay: 1500
      });
    } else {
      steps.push({
        id: question.id,
        message: question.text,
        trigger: question.id === 'last_question' ? null : questions[index + 1].id,
        end: question.id === 'last_question' ? true : null,
        delay: 1500
      });
    }
    if (question.responseChoices) {
      // If the question is not of type info_text.
      const options = [];
      const reactions = [];
      const responses = [];
      const trigger = question.id !== 'last_question' ? questions[index + 1].id : null;
      // Create an array of JSON objects for the choices of the question.
      for (let choice = 0; choice < question.responseChoices.length; choice++) {
        const option = question.responseChoices[choice];
        options.push({
          value: option.id,
          text: option.text,
          description: option.description,
          trigger: 'res_' + question.id + '_' + option.id
        });
        if (question.type !== 'multi_select') {
          responses.push({
            id: 'res_' + question.id + '_' + option.id,
            component: (
              <Answer
                answer={{
                  id: 'res_' + question.id + '_' + option.id,
                  text: option.description ? option.description : option.text,
                  questionId: question.id
                }}
              />
            ),
            trigger: option.responseReaction ? 'reaction_' + question.id + '_' + option.id : trigger
          });
        } else if (choice === 0) {
          // Special response for multi_select type of questions. (choice === 0 so I push this step just once.)
          responses.push({
            id: 'res_' + question.id,
            component: (
              <MultiAnswer
                answer={{
                  id: 'res_' + question.id,
                  text: '',
                  questionId: question.id
                }}
              />
            ),
            trigger: { trigger }
          });
        }
        // Create an array of JSON objects for the reactions of the Grandma.
        if (option.responseReaction) {
          if (option.responseReaction.includes('./chat-images/')) {
            reactions.push({
              id: 'reaction_' + question.id + '_' + option.id,
              component: (
                <div style={{ width: '100%' }}>
                  <img src={option.responseReaction} alt="message" className="images" />
                </div>
              ),
              trigger: option.redirectQuestionId ? option.redirectQuestionId : trigger
            });
          } else {
            reactions.push({
              id: 'reaction_' + question.id + '_' + option.id,
              message: option.responseReaction,
              trigger: option.redirectQuestionId ? option.redirectQuestionId : trigger
            });
          }
        }
      }
      // Finally push first the options(choices) of the question then push the reactions if any.
      let component;
      if (question.type === 'scale') {
        if (question.displayType === 'slider') {
          component = <SliderInput options={options} style={{}} />;
        } else if (question.displayType === 'buttons') {
          component = <Interest options={options} style={{ background: 'transparent' }} />;
        }
      } else if (question.type === 'multi_select') {
        component = <MultiSelect options={options} questionId={question.id} style={{ backgroundColor: 'transparent' }} />;
      } else {
        component = <SingleSelect options={options} style={{ backgroundColor: 'transparent' }} />;
      }
      steps.push({
        id: 'option_' + question.id,
        component: { component },
        waitAction: true,
        replace: true
      });
      responses.forEach(response => steps.push(response));
      if (reactions.length) {
        reactions.forEach(reaction => steps.push(reaction));
      }
    }
  }

  return steps;
};
