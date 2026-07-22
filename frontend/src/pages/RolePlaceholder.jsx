export default function RolePlaceholder({ title, owner }) {
  return (
    <section className="placeholder-card">
      <p className="eyebrow">Role workspace</p>
      <h1>{title}</h1>
      <p>
        This route is ready for implementation by the {owner} team member.
      </p>
    </section>
  );
}
