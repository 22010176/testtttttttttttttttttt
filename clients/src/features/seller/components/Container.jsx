function Container({ children, className, ...props }) {
  return (
    <div {...props} className={[className, "bg-white p-5 rounded shadow"].join(' ')}>
      {children}
    </div>
  )
}

export default Container