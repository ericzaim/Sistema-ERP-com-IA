import React from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-gray-800">Confirmação</h2>
                <p className="mt-4 text-gray-600">Você tem certeza que deseja enviar o formulário?</p>
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
