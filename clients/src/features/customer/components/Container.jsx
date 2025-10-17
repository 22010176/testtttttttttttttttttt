function Container({ className, children, ...props }) {
  return (
    <div className={[className, "max-w-7xl mx-auto"].join(' ')} {...props}>
      {children}
    </div>
  )
}

export default Container