import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import * as S from "./FormStyled";

/* 
  ! YUP : 런타임 값 구문 분석 및 유효성 검사를 위한 스키마 빌더이다.  
    - yup을 사용하면 좀 더 편하게 유효성 검증로직을 구현할 수 있다.
    - yup.object을 통해 schema를 만들어 검증로직, 에러메세지를 한번에 정의할 수 있다.
  ? Schema.oneOf(arrayOfValues: Array<any>, message?: string | function):
    - oneOf(값) : 값만 true로 반환한다.
    [예제]
    let schema = yup.oneOf(['jimmy', 42]);
    await schema.isValid(42); // => true
    await schema.isValid('jimmy'); // => true
    await schema.isValid(new Date()); // => false         
*/
/*  
  ! useForm
  ? register : form의 유효성을 확인하는 메서드
  ? handleSubmit : form을 제출하는 함수
  ? watch : 입력폼에 적힌 값을 확인 하는 옵션
    - e.target.value와 동일하다
  ? formState : form의 현재 상태를 담고 있다.
    - 중복 제출 방지 : isSubmitting (초기값 : false)
      formState에 isSubmitting 속성을 부여하면 -> form이 현재 제출중인 상태인지 아닌지를 알 수 있다.
      즉 -> event.preventDefault()를 사용하지 않아도 된다.
  */

function SignUp() {
  const formSchema = yup.object({
    nickname: yup
      .string()
      .required("한글, 영문, 숫자로 이루어진 2~10자리를 입력해주세요.")
      .min(2, "최소 2자리 이상 입력해주세요.")
      .max(10, "최대 10자까지 가능합니다.")
      .matches(
        /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/,
        "한글, 영문, 숫자로 이루어진 2~10자리를 입력해주세요."
      ),
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다."),
    password: yup
      .string()
      .required("영문 소문자, 숫자, 특수문자를 포함한 8~16자리를 입력해주세요.")
      .min(8, "최소 8자리 이상 입력해주세요.")
      .max(16, "최대 16자까지 가능합니다.")
      .matches(
        /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/,
        "영문 소문자, 숫자, 특수문자를 포함한 8~16자리를 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(formSchema) });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    console.log(data);
  };

  return (
    <>
      <S.Container>
        <S.BackgroundYellow theme="signup" />
        <S.LogForm theme="signup" onSubmit={handleSubmit(onSubmit)}>
          <li className="formLeft">
            <ul className="login-form">
              <li className="loginText">Sign up</li>
              <input
                className="userInput"
                name="nickname"
                type="text"
                placeholder="user Nickname"
                {...register("nickname")}
              />
              {errors.nickname && <p>{errors.nickname.message}</p>}
              <input
                className="emailInput"
                type="email"
                name="email"
                placeholder="email address"
                {...register("email")}
              />
              {errors.email && <p>{errors.email.message}</p>}
              <input
                className="pwdInput"
                name="password"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && <p>{errors.password.message}</p>}
              <input
                className="pwdInput"
                type="password"
                name="passwordConfirm"
                placeholder="Confirm Password"
                {...register("passwordConfirm")}
              />
              {errors.passwordConfirm && (
                <p>{errors.passwordConfirm.message}</p>
              )}
              {/* 로그인버튼의 disabled 속성에 isSubmitting값을 부여하면 -> 제출 처리가 끝날 때까지 버튼이 비활성화 된다. */}
              <input
                className="btn"
                type="submit"
                value="Sign up"
                disabled={isSubmitting}
              />
              <div className="sub-form ">
                <Link to="/login">
                  <li>Log in</li>
                </Link>
              </div>
              <div className="oauth-form">
                <div className="oauth-head">Sign up With</div>
                <div className="oauth">
                  <img src={require("../../asset/구글.png")} alt="Googole" />
                  <img src={require("../../asset/카카오.png")} alt="Kakao" />
                </div>
              </div>
            </ul>
          </li>
          <li className="formRight">
            <div className="welcome">welcome!</div>
            <div className="imgWrapper">
              <img src={require("../../asset/CatDog.png")} alt="CatandDog" />
            </div>
            <div className="oauth-form">
              <div className="oauth-head">Log in With</div>
              <div className="oauth">
                <img src={require("../../asset/구글.png")} alt="Googole" />
                <img src={require("../../asset/카카오.png")} alt="Kakao" />
              </div>
            </div>
          </li>
        </S.LogForm>
      </S.Container>
    </>
  );
}

export default SignUp;
