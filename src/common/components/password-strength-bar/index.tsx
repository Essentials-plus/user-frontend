import ReactPasswordStrengthBar, {
  PasswordStrengthBarProps,
} from "react-password-strength-bar";

const PasswordStrengthBar = (props: PasswordStrengthBarProps) => {
  return (
    <ReactPasswordStrengthBar
      scoreWords={["Zwak", "Zwak", "Oké", "Goed", "Sterk"]}
      shortScoreWord="Te kort"
      {...props}
    />
  );
};

export default PasswordStrengthBar;
