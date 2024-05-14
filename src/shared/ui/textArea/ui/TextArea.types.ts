export interface CustomInputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  extraAttrs?: string
  errorMsg?: string
  label?: string
  customClass?: string
}
