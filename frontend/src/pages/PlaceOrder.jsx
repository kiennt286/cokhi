import React, { useContext, useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
	const { products, cartItems, formatPrice, getCartSubtotal } = useContext(ShopContext)
	const navigate = useNavigate()

	const [step, setStep] = useState('information') // 'information' | 'shipping' | 'payment'

	const cartData = useMemo(() => {
		const temp = []
		for (const productId in cartItems) {
			for (const size in cartItems[productId]) {
				const qty = cartItems[productId][size]
				if (qty > 0) temp.push({ _id: productId, size, quantity: qty })
			}
		}
		return temp
	}, [cartItems])

	useEffect(() => {
		if (cartData.length === 0) {
			navigate('/cart')
		}
	}, [cartData, navigate])

	const subtotal = getCartSubtotal()

	// Form state (demo only)
	const [form, setForm] = useState({
		email: '',
		phone: '',
		firstName: '',
		lastName: '',
		country: '',
		state: '',
		address: '',
		city: '',
		postalCode: '',
	})

	const onChange = (e) => {
		const { name, value } = e.target
		setForm((prev) => ({ ...prev, [name]: value }))
	}

	const proceedToShipping = (e) => {
		e.preventDefault()
		setStep('shipping')
	}

	const proceedToPayment = (e) => {
		e.preventDefault()
		setStep('payment')
	}

	return (
		<div className="border-t pt-10 pb-16">
			<div className="flex items-center gap-3 mb-8">
				<Link to="/cart" className="text-sm text-gray-600 hover:text-black">&larr;</Link>
				<h1 className="font-gunken text-2xl font-semibold">CHECKOUT</h1>
			</div>

			<div className="font-montserrat grid grid-cols-1 lg:grid-cols-2 gap-10">
				{/* Left: Steps + Form */}
				<div>
					<div className="flex items-center gap-6 text-sm mb-6">
						<button className={`font-bold ${step === 'information' ? 'text-black' : 'text-gray-500'}`} onClick={() => setStep('information')}>INFORMATION</button>
						<button className={`font-bold ${step === 'shipping' ? 'text-black' : 'text-gray-500'}`} onClick={() => setStep('shipping')}>SHIPPING</button>
						<button className={`font-bold ${step === 'payment' ? 'text-black' : 'text-gray-500'}`} onClick={() => setStep('payment')}>PAYMENT</button>
					</div>

					{/* INFORMATION */}
					{step === 'information' && (
						<form onSubmit={proceedToShipping} className="space-y-6">
							<div>
								<p className="text-sm font-bold text-gray-800 mb-2">CONTACT INFO</p>
								<input name="email" value={form.email} onChange={onChange} placeholder="Email" className="w-full border-2 border-gray-300 px-3 py-3 text-sm" />
								<input name="phone" value={form.phone} onChange={onChange} placeholder="Phone" className="w-full border-2 border-gray-300 px-3 py-3 text-sm mt-3" />
							</div>

							<div>
								<p className="text-xs text-gray-500 mb-2">SHIPPING ADDRESS</p>
								<div className="grid grid-cols-2 gap-3">
									<input name="firstName" value={form.firstName} onChange={onChange} placeholder="First Name" className="border-2 border-gray-300 px-3 py-3 text-sm" />
									<input name="lastName" value={form.lastName} onChange={onChange} placeholder="Last Name" className="border-2 border-gray-300 px-3 py-3 text-sm" />
								</div>
								<input name="country" value={form.country} onChange={onChange} placeholder="Country" className="w-full border-2 border-gray-300 px-3 py-3 text-sm mt-3" />
								<div className="grid grid-cols-2 gap-3 mt-3">
									<input name="state" value={form.state} onChange={onChange} placeholder="State / Region" className="border-2 border-gray-300 px-3 py-3 text-sm" />
									<input name="postalCode" value={form.postalCode} onChange={onChange} placeholder="Postal Code" className="border-2 border-gray-300  px-3 py-3 text-sm" />
								</div>
								<input name="address" value={form.address} onChange={onChange} placeholder="Address" className="w-full border-2 border-gray-300 px-3 py-3 text-sm mt-3" />
								<input name="city" value={form.city} onChange={onChange} placeholder="City" className="w-full border-2 border-gray-300 px-3 py-3 text-sm mt-3" />
							</div>

							<div className="flex justify-end">
								<button type="submit" className="px-6 py-3 bg-black text-white text-sm hover:bg-gray-800">
									Shipping 
									<span className="ml-2">&rarr;</span>
								</button>
							</div>
						</form>
					)}

					{/* SHIPPING */}
					{step === 'shipping' && (
						<form onSubmit={proceedToPayment} className="space-y-6">
							<p className="text-sm text-gray-600">Phí vận chuyển sẽ được tính ở bước thanh toán.</p>
							<div className="flex justify-between">
								<button type="button" onClick={() => setStep('information')} className="px-5 py-3 border text-sm hover:bg-gray-100">&larr; Back</button>
								<button type="submit" className="px-6 py-3 bg-black text-white text-sm hover:bg-gray-800">Payment &rarr;</button>
							</div>
						</form>
					)}

					{/* PAYMENT (placeholder) */}
					{step === 'payment' && (
						<div className="space-y-6">
							<p className="text-sm text-gray-600">Nhập thông tin thanh toán của bạn (demo).</p>
							<div className="flex justify-between">
								<button onClick={() => setStep('shipping')} className="px-5 py-3 border text-sm hover:bg-gray-100">&larr; Back</button>
								<button className="px-6 py-3 bg-black text-white text-sm hover:bg-gray-800">Place Order</button>
							</div>
						</div>
					)}
				</div>

				{/* Right: Order Summary */}
				<div>
					<div className="bg-white border-2 border-gray-300 p-5">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-sm font-semibold">YOUR ORDER</h3>
							<span className="text-xs text-gray-500">({cartData.length})</span>
						</div>

						<div className="space-y-4">
							{cartData.map((item, idx) => {
								const product = products.find((p) => p._id === item._id)
								if (!product) return null
								const line = product.price * item.quantity
								return (
									<div key={`${item._id}-${item.size}-${idx}`} className="grid grid-cols-[64px_1fr_auto] gap-3 items-center">
										<img src={product.image[0]} alt={product.name} className="w-20 h-20 object-cover" />
										<div className="text-xs">
											<p className="font-medium">{product.name}</p>
											<div className="text-gray-500 mt-0.5">
												{product.brand}
												{item.size !== 'default' && <span>, Size {item.size}</span>}
											</div>
											<div className="mt-1">
												<Link to="/cart" className="text-[11px] text-gray-600 hover:text-black">Change</Link>
												<span className="ml-2 text-[11px] text-gray-500">({item.quantity})</span>
											</div>
										</div>
										<div className="text-xs font-medium">{formatPrice(line)}</div>
									</div>
								)
							})}
						</div>

						<div className="mt-6 space-y-2 text-xs">
							<div className="flex justify-between py-2 border-t border-gray-300">
								<span>Subtotal</span>
								<span className="font-medium">{formatPrice(subtotal)}</span>
							</div>
							<div className="flex justify-between py-2">
								<span>Shipping</span>
								<span className="text-gray-500">Calculated at next step</span>
							</div>
							<div className="flex justify-between py-2 border-t border-gray-300 text-sm">
								<span className="font-semibold">Total</span>
								<span className="font-semibold">{formatPrice(subtotal)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PlaceOrder