const TableRowCourse = () => (
  <tr className="w-full border-b-4 border-fill-background py-3 text-sm text-fill-text-dark font-medium">
    {/* Name */}
    <td className="box-border px-3 py-4 w-[20%]">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-100" />
        <div className="h-6 w-24 rounded bg-gray-100" />
      </div>
    </td>
    {/* Category */}
    <td className="box-border px-3 py-4 w-[20%]">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-100" />
        <div className="h-6 w-24 rounded bg-gray-100" />
      </div>
    </td>
    {/* Instructor */}
    <td className="box-border px-3 py-4 w-[20%]">
      <div className="h-6 w-16 rounded bg-gray-100" />
    </td>
    {/* Description */}
    <td className="box-border px-3 py-4 w-[30%]">
      <div className="h-6 w-28 rounded bg-gray-100" />
    </td>
    {/* Actions */}
    <td className="box-border px-3 py-4 w-[10%]">
      <div className="h-6 w-5 rounded bg-gray-100" />
    </td>
  </tr>
);

export default TableRowCourse;
