function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[960px] px-4 pb-6">
      <div className="flex flex-col gap-4 bg-orange-500 px-8 py-8 text-white sm:flex-row sm:items-center sm:justify-between">
        <p className="text-2xl font-bold">AppITZFood.com</p>
        <div className="flex flex-wrap gap-6 text-sm font-semibold">
          <span>Política de privacidad</span>
          <span>Términos del servicio</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
