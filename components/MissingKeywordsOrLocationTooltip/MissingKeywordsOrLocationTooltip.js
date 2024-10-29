import React, { Component } from "react";
import styled from "styled-components";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const ContainerDiv = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9;
  min-height: 150px;
  padding: 16px;
  box-sizing: border-box;
  background: linear-gradient(173.14deg, #5c6ac4 0%, #202e78 100%);
  box-shadow: 0px -2px 4px rgba(77, 77, 77, 0.24);
  align-items: center;
  justify-content: center;
  ${props => props.showForm && "min-height: 100vh"}
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  justify-content: center;
`;

const Button = styled.button`
  height: 46px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(96.05deg, #fe909c 0.65%, #ff6c98 96.18%);
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  padding: 0 27px;
  cursor: pointer;
  box-sizing: border-box;
`;

const ContentDiv = styled.div`
  /* max-width: 600px; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  color: white;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 10px;
`;

const Text = styled.div`
  color: white;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  max-width: 328px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputDiv = styled.div`
  position: relative;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border-radius: 5px;
  width: 100%;
  height: 46px;
  border: none;
  padding-left: 46px;
  padding-right: 16px;
  box-sizing: border-box;
  color: #666a88;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  ::placeholder {
    color: #808cd2;
  }
`;

const ButtonForm = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  background: linear-gradient(99.5deg, #fe909c 0.65%, #ff6c98 96.18%);
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const TextDesktop = styled.div`
  color: white;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
`;

const IconBlock = styled.div`
  position: absolute;
  left: 16px;
`;

class MissingKeywordsOrLocationTooltip extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      showForm: false,
      values: {},
      errors: {}
    };
  }

  triggerOnSubmit = () => {
    const { onSubmit } = this.props;
    const { values } = this.state;

    if (typeof onSubmit === "function") {
      onSubmit(
        values,
        () => {
          this.setState({ showForm: false });
        },
        errors => {
          this.setState({ errors });
        }
      );
    }
  };

  submit = e => {
    e.preventDefault();
    const { validate } = this.props;
    const { values } = this.state;

    if (typeof validate === "function") {
      validate(values, errors => {
        if (errors && Object.keys(errors).length) {
          this.setState({
            errors
          });
        } else {
          this.triggerOnSubmit();
        }
      });
    } else {
      this.triggerOnSubmit();
    }
  };

  onChange = e => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    const {
      title,
      onClose,
      show,
      textDesktop1,
      textDesktop2,
      textMobile,
      button,
      formButton,
      formInputs
    } = this.props;
    const { showForm, errors } = this.state;
    if (!show) {
      return null;
    }

    return (
      <ContainerDiv showForm={showForm}>
        <CloseIcon
          onClick={() => {
            if (showForm) {
              this.setState({ showForm: false });
            } else {
              onClose();
            }
          }}
          src="/static/images/icon-close.svg"
        />
        {!showForm ? (
          <ContentDiv>
            <Title className="mobile">{title}</Title>
            <Text className="mobile">{textMobile}</Text>
            <TextDesktop className="desktop">{textDesktop1}</TextDesktop>
            <Text className="desktop">{textDesktop2}</Text>
            <Button
              onClick={() => {
                this.setState({ showForm: true }, () => {
                  if (this.inputRef.current) {
                    this.inputRef.current.focus();
                  }
                });
              }}
            >
              {button && button.icon} {button && button.title}
            </Button>
          </ContentDiv>
        ) : (
          <Form onSubmit={this.submit}>
            {formInputs &&
              Array.isArray(formInputs) &&
              formInputs.map((input, index) => (
                <InputDiv key={"tooltip-form-input-" + index}>
                  <IconBlock>{input.icon}</IconBlock>
                  <Input
                    onChange={this.onChange}
                    ref={index == 0 && this.inputRef}
                    placeholder={input.placeholder}
                    name={input.name}
                  />
                  <ErrorMessage
                    position="bottom"
                    message={errors && errors[input.name]}
                  />
                </InputDiv>
              ))}

            <ButtonForm>
              {formButton && formButton.icon} {formButton && formButton.title}
            </ButtonForm>
          </Form>
        )}
      </ContainerDiv>
    );
  }
}

export default MissingKeywordsOrLocationTooltip;
