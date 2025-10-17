function SectionIsland({ className, children, ...props }) {
  return (
    <div {...props} className={[className, "border border-gray-200 rounded p-5 shadow-sm"].join(' ')} >
      {children}
    </div>
  )
}

export default SectionIsland