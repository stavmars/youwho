import React from 'react';
import { Slider, Handles, Rail } from 'react-compound-slider';
import { IComponentProps } from 'app/modules/chatbot/configure-steps';
// tslint:disable:jsx-no-lambda

export const Handle = ({ handle: { id, value, percent }, getHandleProps }) => (
  <div
    style={{
      left: `${percent}%`,
      position: 'absolute',
      marginLeft: -20,
      marginTop: 10,
      zIndex: 2,
      width: 46,
      height: 55,
      border: 0,
      textAlign: 'center',
      cursor: 'pointer',
      borderRadius: '7px',
      backgroundColor: '#fff',
      color: '#fff'
    }}
    {...getHandleProps(id)}
  />
);

// TODO: Make it look as a ruler OR place option.texts on slider

export type ISliderInputProps = IComponentProps;

export class SliderInput extends React.Component<ISliderInputProps> {
  onChange = x => {
    this.props.options.map(
      option =>
        // @ts-ignore
        option.value === `${x}` && this.props.triggerNextStep({ trigger: option.trigger })
    );
  };

  render() {
    const sliderStyle: React.CSSProperties = {
      // Give the slider some width
      position: 'relative',
      width: '90%',
      left: '5%',
      height: 65
    };

    const railStyle: React.CSSProperties = {
      position: 'absolute',
      width: '100%',
      height: 30,
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 5,
      background: 'transparent linear-gradient(278deg, #FFFFFF 0%, #E3E3E6 100%) 0% 0% no-repeat padding-box',
      boxShadow: '0px 3px 6px #00000029',
      opacity: 0.52
    };

    const { options } = this.props;
    const min = 1;
    const max = options.length;
    const def = max / 2;
    const className = max < 10 ? 'tooltip' : 'ten-tooltip';
    const emo = options[0].description === '❤️' ? 'emoji' : '';

    return (
      <div style={{ width: '100%' }}>
        <Slider rootStyle={sliderStyle} domain={[min, max]} step={1} values={[def]} onChange={this.onChange}>
          <Rail>
            {(
              { getRailProps } // adding the rail props sets up events on the rail
            ) => <div style={railStyle} {...getRailProps()} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle key={handle.id} handle={handle} getHandleProps={getHandleProps} />
                ))}
              </div>
            )}
          </Handles>
        </Slider>
        <div className={`${className} range${max}`}>
          {options.map((option, index) => (
            <span className={`${className}-text ${emo} range${max} opt${index}`} key={option.trigger}>
              {option.description}
            </span>
          ))}
          {max === 10 && (
            <div style={{ width: '100%' }}>
              <span>Αριστερά</span>
              <span style={{ float: 'right', marginRight: '15px' }}>Δεξιά</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SliderInput;
