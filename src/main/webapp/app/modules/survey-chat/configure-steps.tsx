import React from 'react';
import SliderInput from 'app/modules/survey-chat/slider-input';
import Answer from 'app/modules/survey-chat/answer';
import Interest from 'app/modules/survey-chat/interest';
import SingleSelect from 'app/modules/survey-chat/single-select';
import MultiSelect from 'app/modules/survey-chat/multi-select';
import MultiAnswer from 'app/modules/survey-chat/multi-answer';
import ResultsButton from 'app/modules/survey-chat/results-button';

// tslint:disable:jsx-no-lambda

export interface IComponentProps {
  options: any;
  category: string;
  style: React.CSSProperties;
}

export interface IAnswer {
  id: string;
  text: string;
  questionId: string;
}

export interface IOption {
  questionId: string;
  value: string;
  text: string;
  description?: string;
  trigger: string;
}

export const configureStep = (questions, scenario: number) => {
  const steps = [];
  let finalQuestions = [];

  if (scenario) {
    const intro = questions.filter(question => question.category === 'Εισαγωγή' || question.category === 'Δημογραφικά');
    const nation = questions.filter(question => question.category === 'Ελλάδα & Κόσμος');
    const social = questions.filter(question => question.category === 'Κοινωνικές αξίες & δράσεις');
    const politics = questions.filter(question => question.category === 'Πολιτική & Πρόσωπα');
    const lifestyle = questions.filter(question => question.category === 'Lifestyle & Προσωπικότητα');
    const exit = questions.filter(question => question.category === 'Exit');
    finalQuestions = finalQuestions.concat(intro, lifestyle, politics, social, nation, exit);
  } else {
    finalQuestions = finalQuestions.concat(questions);
  }

  for (let index = 0; index < finalQuestions.length; index++) {
    const question = finalQuestions[index];
    // Creating a step for each question.
    if (index === finalQuestions.length - 1) {
      // Add the button to results page if last step.
      steps.push({
        id: 'results-button',
        // @ts-ignore
        component: <ResultsButton />,
        end: true
      });
    }
    if (question.imageURL && question.type === 'info_text') {
      // Simple granny text with an image.
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
        trigger:
          index === finalQuestions.length - 1
            ? 'results-button'
            : question.responseChoices
            ? 'option_' + question.id
            : finalQuestions[index + 1].id
      });
    } else if (question.type !== 'info_text') {
      // Granny question
      if (question.imageURL) {
        // If it has an image also.
        steps.push({
          id: question.id,
          component: (
            <span id={`question-${question.id}`} style={{ fontFamily: 'TTNormsProBold' }}>
              {question.text}
            </span>
          ),
          trigger: 'image_' + question.id,
          asMessage: true,
          delay: 1500
        });
        steps.push({
          id: 'image_' + question.id,
          component: (
            <div style={{ width: '100%' }}>
              <img src={question.imageURL} alt="message" className="images" />
            </div>
          ),
          trigger:
            index === finalQuestions.length - 1
              ? 'results-button'
              : question.responseChoices
              ? 'option_' + question.id
              : finalQuestions[index + 1].id
        });
      } else {
        // Plain question
        steps.push({
          id: question.id,
          component: (
            <span
              id={`question-${question.id}`}
              style={{ fontFamily: 'TTNormsProBold' }}
              dangerouslySetInnerHTML={{ __html: question.text }}
            />
          ),
          trigger:
            index === finalQuestions.length - 1
              ? 'results-button'
              : question.responseChoices
              ? 'option_' + question.id
              : finalQuestions[index + 1].id,
          asMessage: true,
          delay: 1500
        });
      }
    } else {
      steps.push({
        id: question.id,
        // message: question.text,
        component: (
          <span
            id={`question-${question.id}`}
            style={{ fontFamily: 'TTNormsProBold' }}
            dangerouslySetInnerHTML={{ __html: question.text }}
          />
        ),
        asMessage: true,
        trigger: index === finalQuestions.length - 1 ? 'results-button' : finalQuestions[index + 1].id,
        delay: 1500
      });
    }
    if (question.responseChoices) {
      // If the question is not of type info_text.
      const options = [];
      const reactions = [];
      const responses = [];
      const trigger = question.id !== 'last_question' ? finalQuestions[index + 1].id : 'results-button';
      // Create an array of JSON objects for the choices of the question.
      for (let choice = 0; choice < question.responseChoices.length; choice++) {
        const option = question.responseChoices[choice];
        options.push({
          questionId: question.id,
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
                reset
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
          // Special response for multi_select type of finalQuestions. (choice === 0 so I push this step just once.)
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
            trigger
          });
        }
        // Create an array of JSON objects for the reactions of the Grandma.
        if (option.responseReaction) {
          if (option.responseReaction.includes('/chat-images/')) {
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
      let component;
      if (question.type === 'scale') {
        if (question.displayType === 'slider') {
          component = <SliderInput options={options} category={question.category} style={{}} />;
        } else if (question.displayType === 'buttons') {
          component = <Interest options={options} category={question.category} style={{ background: 'transparent' }} />;
        }
      } else if (question.type === 'multi_select') {
        component = (
          <MultiSelect options={options} category={question.category} questionId={question.id} style={{ backgroundColor: 'transparent' }} />
        );
      } else {
        component = <SingleSelect options={options} category={question.category} style={{ backgroundColor: 'transparent' }} />;
      }
      // Finally push first the options(choices) of the question then push the reactions if any.
      steps.push({
        id: 'option_' + question.id,
        component,
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
