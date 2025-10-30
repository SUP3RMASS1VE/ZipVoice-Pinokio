module.exports = {
  run: [
    // windows nvidia
    {
      when: "{{platform === 'win32' && gpu === 'nvidia'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "uv pip install --force-reinstall torch==2.9.0 torchvision==0.24.0 torchaudio==2.9.0 --index-url https://download.pytorch.org/whl/cu128",
          "uv pip install torchcodec==0.8.1",
          "{{args && args.triton ? 'uv pip install -U --pre triton-windows' : ''}}",
          "{{args && args.sageattention ? 'uv pip install https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu128torch2.7.0-cp310-cp310-win_amd64.whl' : ''}}",
        ],
      },
      next: null,
    },
    // linux nvidia
    {
      when: "{{platform === 'linux' && gpu === 'nvidia'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "uv pip install --force-reinstall torch==2.9.0 torchvision==0.24.0 torchaudio==2.9.0 {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/cu128",
          "uv pip install torchcodec==0.8.1",
          "{{args && args.sageattention ? 'uv pip install git+https://github.com/thu-ml/SageAttention.git' : ''}}",
        ],
      },
      next: null,
    },
  ],
};
