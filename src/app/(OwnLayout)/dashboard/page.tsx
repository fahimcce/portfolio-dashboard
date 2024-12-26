export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold">Projects</h2>
        <p className="mt-2 text-sm text-gray-600">Manage your projects here.</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold">Skills</h2>
        <p className="mt-2 text-sm text-gray-600">Showcase your skills.</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold">Blogs</h2>
        <p className="mt-2 text-sm text-gray-600">
          Write and share your blogs.
        </p>
      </div>
    </div>
  );
}
