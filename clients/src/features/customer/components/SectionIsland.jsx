function SectionIsland({ className, children, ...props }) {
  return (
    <div {...props} className={[className, "border border-gray-200 bg-white rounded p-5"].join(' ')} >
      {children}
    </div>
  )
}

export default SectionIsland